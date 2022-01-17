function(proj, body) {
  var template;
  if (proj == null) {
    proj = '.';
  }
  if (body == null) {
    body = "";
  }
  template = fs.readFileSync("" + proj + "/layout.html", "utf8");
  return eco.render(template, {
    body: body
  });
}