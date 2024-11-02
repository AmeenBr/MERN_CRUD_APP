const Article = require("../models/Article");

//Create a new article
exports.createArticle = async (req, res) => {
  const { title, text } = req.body;

  try {
    const article = new Article({ title, text });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get single article by ID

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update an article

exports.updateArticle = async (req, res) => {
  const { title, text } = req.body;

  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    article.title = title || article.title;
    article.text = text || article.text;

    await article.save();
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
