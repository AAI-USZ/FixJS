function () {
  if (typeof this.cache['article-content'] !== 'undefined') {
    return this.cache['article-content'];
  }

  articleContent = helpers.grabArticle(this._document);
  if (helpers.getInnerText(articleContent, false) === "") {
    this._document.body.innerHTML = this.cache['body'];
    articleContent = helpers.grabArticle(this._document, true);
    if (helpers.getInnerText(articleContent, false) === "") {
      return this.cache['article-content'] = false;
    }
  }

  return this.cache['article-content'] = articleContent.innerHTML;
}