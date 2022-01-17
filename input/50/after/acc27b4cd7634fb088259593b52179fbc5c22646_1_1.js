function(name) {
  var coffee;
  coffee = fs.readFileSync("./pages" + name + ".coffee").toString();
  return cc.render(coffee);
}