function processTree(data){
  var filenames = [];

  for (var i = 0; i < data.data.tree.length; i++){
    var file = data.data.tree[i];
    var match = file.path.match(/^feature-detects\/(.*)/);
    if (!match) continue;

    var relpath = location.host == "modernizr.github.com" ?
                    'https://raw.github.com/Modernizr/Modernizr/master/' : '../';

    filenames.push(relpath + match[0]);
  }

  var jqxhrs = filenames.map(function(filename){
    return jQuery.getScript(filename);
  });

  jQuery.when.apply(jQuery, jqxhrs).done(resultsToDOM);

}