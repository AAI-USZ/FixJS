function(articlesData) {
  var lowestBoundX = -28;
  var uppestBoundX = 18;
  var lowestBoundY = -3;
  var uppestBoundY = 15; 

  nextRelatedPages = [];
  var grid = {rows: 2, cols: 5};
  var cellHeight = Math.ceil((uppestBoundY - lowestBoundY) / grid.rows);
  var cellWidth = Math.ceil((uppestBoundX - lowestBoundX) / grid.cols);
  var i = 0;
  var row = 0;
  var col = 0;
  var doItHigh = 0; // 0 or 1

  for (articleId in articlesData) {
    var article = new Article(articlesData[articleId].name, articleId);
    row = Math.floor(i/grid.cols);
    col = i % grid.cols;
    doItHigh = row % 2 ? i % 2 : (i + 1) % 2;
    var lowerBoundX = lowestBoundX + col * cellWidth + cellWidth/4;
    var upperBoundX = lowerBoundX + cellWidth/2;
    if (doItHigh) {
      var lowerBoundY = lowestBoundY + row * cellHeight + cellHeight/2;
      var upperBoundY = lowerBoundY + cellHeight/2;
    }
    else {
      var lowerBoundY = lowestBoundY + row * cellHeight;
      var upperBoundY = lowerBoundY + cellHeight/2;
    }
    var x = lowerBoundX + (Math.random() * (upperBoundX - lowerBoundX));
    var y = lowerBoundY + (Math.random() * (upperBoundY - lowerBoundY));
    var wikiPage = new WikiPage(article, [x, y], false);
    nextRelatedPages.push(wikiPage);
    i++;
  }

  // on the first receieve, the related pages array is empty
  if (relatedPages.length == 0) {
    useNewPages();
  }
}