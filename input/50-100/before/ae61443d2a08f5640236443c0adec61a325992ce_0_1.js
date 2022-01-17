function() {
  var articlesData = {}; 
  for (articleId in this.articles) {
    var articleData = {"id": articleId, "name": this.articles.name};
    articlesData[articleId] = articleData;
  }
  return articleData;
}