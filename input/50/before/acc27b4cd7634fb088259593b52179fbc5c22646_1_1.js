function(body) {
  var template;
  if (body == null) {
    body = "";
  }
  template = fs.readFileSync("./layout.html", "utf8");
  return eco.render(template, {
    body: body
  });
}