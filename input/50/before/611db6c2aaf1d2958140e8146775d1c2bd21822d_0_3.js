function highlight(code, brush) {

  brush.init({ toolbar: false });

  return brush.getHtml(code);
}