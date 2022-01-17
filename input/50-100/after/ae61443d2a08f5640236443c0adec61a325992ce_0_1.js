function() {
  var articlesData = {}; 
  for (articleId in this.articles) {
    var articleData = {"id": articleId, "name": this.articles[articleId].name};
    articlesData[articleId] = articleData;
  }
  return articlesData;
}