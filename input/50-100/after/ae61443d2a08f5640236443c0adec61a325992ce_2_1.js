function(articlesData) {
  relatedPages = [];
  for (articleId in articlesData) {
    console.log(articlesData[articleId]);
    var article = new Article(articleId);
    article.name = articlesData[articleId].name;
    console.log(article);
    var wikiPage = new WikiPage(article, [10, 10], false);
    console.log(wikiPage);
    relatedPages.push(wikiPage);
  }
}