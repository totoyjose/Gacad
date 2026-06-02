const Article = require('../models/Article');

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    console.log("📥 Received article data:", req.body);   // ← DEBUG LOG

    const article = await Article.create(req.body);
    console.log("✅ Article created successfully:", article);
    
    res.status(201).json({ 
      message: 'Article created successfully',
      article 
    });
  } catch (error) {
    console.error("❌ Create Article Error:", error);
    res.status(400).json({ 
      message: error.message 
    });
  }
};

const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getArticles, createArticle, updateArticle, deleteArticle };