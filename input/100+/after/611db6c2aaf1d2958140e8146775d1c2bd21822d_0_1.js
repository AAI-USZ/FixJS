function mapBrushes() {
  fs.readdirSync(scriptsDir).forEach(function (file) {
    if (!file.match(/shBrush\w+\.js/)) return;
    
    var language = require(path.join(scriptsDir, file));
    language.Brush.aliases.forEach(function (alias) {
      langMap[alias.toLowerCase()] = language;
    });
  });  

  // Add some known aliases
  langMap['cs'] = langMap['c#'];

  // Add similar brushes to similar map
  Object.keys(similarLangs).forEach(function (lang) {
    similarLangs[lang].forEach(function (similar) {
      similarMap[similar] = langMap[lang];
    });
  });
}