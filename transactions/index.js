const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Transform } = require('stream');
const { format } = require('@fast-csv/format');
const { Parser } = require('json2csv');


const app = express();
const PORT = 4500;
app.use(cors());

// --- Connect to Mongo ---
const MONGO_URI = 'mongodb://localhost:27017/bank-test';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// --- Models ---
const userSchema = new mongoose.Schema({
  name: String,
  address: String,
}, { timestamps: true });

const transactionSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  amount: Number,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

// --- GET /transactions ---
app.get('/transactions', async (req, res) => {
  try {
    // Pagination params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Aggregate to join User details
    const transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: 'users', // collection name in Mongo
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 1,
          name: '$user.name',
          amount: 1,
          address: '$user.address',
        }
      },
      { $skip: skip },
      { $limit: limit }
    ]);

    const total = await Transaction.countDocuments();

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      transactions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/export-csv-no-stream', async (req, res) => {
  try {
    const transactions = await Transaction.find().lean();
    const parser = new Parser();
    const csv = parser.parse(transactions);

    res.header('Content-Type', 'text/csv');
    res.attachment('users_transaction_no_stream.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating CSV');
  }
});

// Stream-based CSV export
app.get('/export-csv', (req, res) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="users_transaction_stream.csv"');

  const csvStream = format({ headers: true });
  const cursor = Transaction.find().lean().cursor();

  const transformStream = new Transform({
    objectMode: true,
    transform(doc, encoding, callback) {
      doc._id = doc._id.toString();
      callback(null, doc);
    }
  });

  cursor.pipe(transformStream).pipe(csvStream).pipe(res);
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
