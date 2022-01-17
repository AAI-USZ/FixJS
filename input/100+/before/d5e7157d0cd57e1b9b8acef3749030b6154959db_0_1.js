function getIconURI(origin) {
    var icons = runningApps[origin].manifest.icons;

    var sizes = Object.keys(icons).map(function parse(str) {
      return parseInt(str, 10);
    });

    sizes.sort(function(x, y) { return y - x; });

    var index = sizes[(HVGA) ? sizes.length - 1 : 0];
    return origin + icons[index];
  }