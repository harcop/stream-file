const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const MONGO_URI = 'mongodb://localhost:27017/bank-test';

const BATCH_SIZE = 1000;
const TOTAL_USERS = 1000000; // 10 million

// --- Schemas ---
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

async function connectDB() {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
}

async function seedData() {
  console.log('Seeding started...');
  for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
    const userBatch = [];
    const transactionBatch = [];

    for (let j = 0; j < BATCH_SIZE && i + j < TOTAL_USERS; j++) {
      const user = {
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
      };
      userBatch.push(user);
    }

    // Insert users
    const insertedUsers = await User.insertMany(userBatch);

    // Create transactions
    insertedUsers.forEach(user => {
      const numTransactions = faker.number.int({ min: 3, max: 10 });
      for (let k = 0; k < numTransactions; k++) {
        transactionBatch.push({
          userId: user._id,
          amount: faker.finance.amount({ min: 10, max: 1000 }),
        });
      }
    });

    // Insert transactions
    await Transaction.insertMany(transactionBatch);

    console.log(`Inserted ${i + BATCH_SIZE} users and ${transactionBatch.length} transactions...`);
  }

  console.log('Seeding completed!');
}

async function getTransaction() {
  const dd = await Transaction.find()
  console.log(dd, null, 2)
}

(async () => {
  try {
    await connectDB();
    await seedData();
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
})();
