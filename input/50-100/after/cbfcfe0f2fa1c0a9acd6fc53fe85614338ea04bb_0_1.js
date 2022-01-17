function () {
  function collect(obj, prop) {
    var out = [], i, l;

    for (i in obj) {
      if (obj.hasOwnProperty(i) && obj[i][prop]) {
        out.push(obj[i][prop]);
      }
    }

    return out;
  }

  function load_assets(assets, callback) {
    yepnope({load: collect(assets, 'link'), complete: callback});
  };

  return load_assets;
}