function prepArticle (articleContent) {
  cleanStyles(articleContent);
  killBreaks(articleContent);

  /* Clean out junk from the article content */
  clean(articleContent, "form");
  clean(articleContent, "object");
  clean(articleContent, "h1");
  /**
   * If there is only one h2, they are probably using it
   * as a header and not a subheader, so remove it since we already have a header.
   ***/
  if (articleContent.getElementsByTagName('h2').length == 1) clean(articleContent, "h2");

  clean(articleContent, "iframe");

  cleanHeaders(articleContent);

  /* Do these last as the previous stuff may have removed junk that will affect these */
  cleanConditionally(articleContent, "table");
  cleanConditionally(articleContent, "ul");
  cleanConditionally(articleContent, "div");

  /* Remove extra paragraphs */
  var articleParagraphs = articleContent.getElementsByTagName('p');
  for (i = articleParagraphs.length - 1; i >= 0; i--) {
    var imgCount = articleParagraphs[i].getElementsByTagName('img').length;
    var embedCount = articleParagraphs[i].getElementsByTagName('embed').length;
    var objectCount = articleParagraphs[i].getElementsByTagName('object').length;

    if (imgCount == 0 && embedCount == 0 && objectCount == 0 && getInnerText(articleParagraphs[i], false) == '') {
      articleParagraphs[i].parentNode.removeChild(articleParagraphs[i]);
    }
  }

  cleanSingleHeader(articleContent);

  try {
    articleContent.innerHTML = articleContent.innerHTML.replace(/<br[^>]*>\s*<p/gi, '<p');
  } catch (e) {
    dbg("Cleaning innerHTML of breaks failed. This is an IE strict-block-elements bug. Ignoring.");
  }

}