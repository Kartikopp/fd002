const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required']
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail image is required']
  },
  category: {
    type: String,
    enum: [
      'Stock Market',
      'Mutual Funds',
      'SIP',
      'Insurance',
      'Tax Saving',
      'Passive Income',
      'Personal Finance',
      'Trading',
      'Crypto'
    ],
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String],
  readingTime: {
    type: Number,
    default: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Auto generate slug from title
blogSchema.pre('save', function(next) {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^
w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);