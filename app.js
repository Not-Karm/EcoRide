const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('commute.db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a table to store user inputs
db.run('CREATE TABLE IF NOT EXISTS commute_data (id INTEGER PRIMARY KEY, name TEXT, locality TEXT, destination TEXT)');

// Serve the HTML file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle data submission
app.post('/submit', (req, res) => {
  const { name, locality, destination, phone, email } = req.body;

  // Insert user input into the database
  db.run('INSERT INTO commute_data (name, locality, destination, phone, email) VALUES (?, ?, ?, ?, ?)', [name, locality, destination, phone, email], (err) => {
    if (err) {
        console.error('Error saving data:', err);
        return res.status(500).json({ error: 'Error saving data' });
    }
    res.json({ message: 'Data saved successfully' });
});
});


// Handle search
app.get('/search', (req, res) => {
  const { locality, destination } = req.query;

  // Query the database for users with matching locality and destination, including phone and email
  db.all('SELECT name, locality, destination, phone, email FROM commute_data WHERE locality = ? AND destination = ?', [locality, destination], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching data' });
    }
    res.json(rows);
  });
});


// Retrieve all records from the database
app.get('/allRecords', (req, res) => {
  // Query the database for all records
  db.all('SELECT * FROM commute_data', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching all records' });
    }
    res.json(rows);
  });
});


// Handle Get Record by ID
app.get('/record/:id', (req, res) => {
  const recordId = req.params.id;

  // Query the database for the record with the specified ID
  db.get('SELECT * FROM commute_data WHERE id = ?', [recordId], (err, row) => {
      if (err) {
          return res.status(500).json({ error: 'Error fetching data' });
      }

      if (!row) {
          return res.status(404).json({ error: 'Record not found' });
      }

      res.json(row);
  });
});


// Update a Record
app.put('/update/:id', (req, res) => {
  const recordId = req.params.id;
  const { name, locality, destination, phone, email } = req.body;

  // Update the record in the database
  db.run('UPDATE commute_data SET name = ?, locality = ?, destination = ?, phone = ?, email = ? WHERE id = ?',
      [name, locality, destination, phone, email, recordId],
      (err) => {
          if (err) {
              return res.status(500).json({ error: 'Error updating data' });
          }
          res.json({ message: 'Record updated successfully' });
      });
});

// Delete a Record by ID
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM commute_data WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error deleting data' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: 'Record deleted successfully' });
  });
});


// Search by Locality and Destination
app.get('/search/:locality/:destination', (req, res) => {
  const { locality, destination } = req.params;

  db.all('SELECT * FROM commute_data WHERE locality = ? AND destination = ?', [locality, destination], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching data' });
    }
    res.json(rows);
  });
});

// Count Records
app.get('/countRecords', (req, res) => {
  db.get('SELECT COUNT(*) as count FROM commute_data', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error counting records' });
    }
    res.json({ count: result.count });
  });
});

// Get Unique Localities
app.get('/uniqueLocalities', (req, res) => {
  db.all('SELECT DISTINCT locality FROM commute_data', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching unique localities' });
    }
    const localities = rows.map(row => row.locality);
    res.json({ localities });
  });
});

// Get Unique Destinations
app.get('/uniqueDestinations', (req, res) => {
  db.all('SELECT DISTINCT destination FROM commute_data', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching unique destinations' });
    }
    const destinations = rows.map(row => row.destination);
    res.json({ destinations });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


