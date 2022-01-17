function (file) {
    if (!file.match(/shBrush\w+\.js/)) return;
    
    var language = require(path.join(scriptsDir, file));
    language.Brush.aliases.forEach(function (alias) {
      langMap[alias.toLowerCase()] = language;
    });
  }