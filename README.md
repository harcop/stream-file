# File Upload Demo

This repository demonstrates file upload, streaming, and transaction handling in Node.js. Below is an overview of the project structure and instructions for running the main scripts.

## Folder Structure

- **database/**  
  Contains database-related code.
  - `db.js`: Database connection and logic.

- **movies/**  
  Contains movie files and related scripts.
  - `index.js`: Script for handling movie files.
  - `movie1.mp4`: Sample movie files (you can add more large movie files to test).
  - `public/index.html`: Frontend HTML for file upload or streaming.

- **stream/**  
  Contains streaming utilities.
  - `input.txt`: Sample input file for streaming.
  - `read.js`: Script to read files as streams.
  - `slow.js`: Script to simulate slow streaming.
  - `write.js`: Script to write streams to files.

- **transactions/**  
  Contains transaction-related logic.
  - `index.js`: Script for handling transactions.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```sh
   git clone git@github.com:harcop/stream-file.git
   cd stream-file
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Scripts

#### Database

- Run database logic:
  ```sh
  node database/db.js
  ```

#### Movies

- Run movie handler:
  ```sh
  node movies/index.js
  ```
- Open `movies/public/index.html` in your browser for the frontend.

#### Streaming

- Read a file as a stream:
  ```sh
  node stream/read.js
  ```
- Simulate slow streaming:
  ```sh
  node stream/slow.js
  ```
- Write to a file using streams:
  ```sh
  node stream/write.js
  ```

#### Transactions

- Run transaction handler:
  ```sh
  node transactions/index.js
  ```

## Notes

- Ensure you have the necessary permissions to read/write files in the respective directories.
- Modify scripts as needed for your specific use case.
