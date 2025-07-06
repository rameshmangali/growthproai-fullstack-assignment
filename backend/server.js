require('dotenv').config(); // 👈 Load .env before anything else

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample headlines for regeneration
const sampleHeadlines = [
  "Why {name} is {location}'s Best Kept Secret in 2025",
  "{name} - {location}'s Top Choice for Excellence",
  "Discover Why {name} is Dominating {location} in 2025",
  "{name}: The {location} Business Everyone's Talking About",
  "How {name} Became {location}'s Premier Destination"
];

// POST /business-data
app.post('/business-data', (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required' });
  }

  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  const reviews = Math.floor(Math.random() * 200) + 50;
  const headline = sampleHeadlines[0].replace('{name}', name).replace('{location}', location);

  res.json({
    rating: parseFloat(rating),
    reviews,
    headline
  });
});

// GET /regenerate-headline
app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;

  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required' });
  }

  const randomIndex = Math.floor(Math.random() * sampleHeadlines.length);
  const headline = sampleHeadlines[randomIndex]
    .replace('{name}', name)
    .replace('{location}', location);

  res.json({ headline });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
