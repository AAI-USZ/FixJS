function mapBrushes() {
  fs.readdirSync(scriptsDir).forEach(function (file) {
    if (!file.match(/shBrush\w+\.js/)) return;
    
    var brush = require(path.join(scriptsDir, file)).Brush;
    brush.aliases.forEach(function (alias) {
      brushMap[alias.toLowerCase()] = brush;
    });
  });  

  // Add some known aliases
  brushMap['cs'] = brushMap['c#'];

  // Add similar brushes to similar map
  Object.keys(similarLangs).forEach(function (lang) {
    similarLangs[lang].forEach(function (similar) {
      similarMap[similar] = brushMap[lang];
    });
  });
}