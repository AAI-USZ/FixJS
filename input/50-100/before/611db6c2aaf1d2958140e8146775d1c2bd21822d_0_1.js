function (file) {
    if (!file.match(/shBrush\w+\.js/)) return;
    
    var brush = require(path.join(scriptsDir, file)).Brush;
    brush.aliases.forEach(function (alias) {
      brushMap[alias.toLowerCase()] = brush;
    });
  }