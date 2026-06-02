const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'News'
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);