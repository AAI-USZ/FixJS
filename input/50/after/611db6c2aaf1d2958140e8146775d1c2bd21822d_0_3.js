function highlight(code, language, options) {

  var brush = new language.Brush();
  brush.init({ toolbar: false });

  return brush.getHtml(code);
}