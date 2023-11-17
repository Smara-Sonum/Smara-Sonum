const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Mongoose schema for your data (e.g., Podcasts)
const podcastSchema = new mongoose.Schema({
  title: String,
  host: String,
});

const Podcast = mongoose.model('Podcast', podcastSchema);

// Define API routes
app.get('/podcasts', async (req, res) => {
  const podcasts = await Podcast.find();
  res.json(podcasts);
});

app.post('/podcasts', async (req, res) => {
  const { title, host } = req.body;
  const newPodcast = new Podcast({ title, host });
  await newPodcast.save();
  res.json(newPodcast);
});

app.get('/podcasts/:id', async (req, res) => {
  const podcast = await Podcast.findById(req.params.id);
  if (!podcast) return res.status(404).json({ error: 'Podcast not found' });
  res.json(podcast);
});

app.put('/podcasts/:id', async (req, res) => {
  const { title, host } = req.body;
  const podcast = await Podcast.findByIdAndUpdate(
    req.params.id,
    { title, host },
    { new: true }
  );
  if (!podcast) return res.status(404).json({ error: 'Podcast not found' });
  res.json(podcast);
});

app.delete('/podcasts/:id', async (req, res) => {
  const podcast = await Podcast.findByIdAndRemove(req.params.id);
  if (!podcast) return res.status(404).json({ error: 'Podcast not found' });
  res.json(podcast);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
