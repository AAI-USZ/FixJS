function getIconURI(origin) {
    var icons = runningApps[origin].manifest.icons;

    var sizes = Object.keys(icons).map(function parse(str) {
      return parseInt(str, 10);
    });

    sizes.sort(function(x, y) { return y - x; });

    var index = sizes[(HVGA) ? sizes.length - 1 : 0];

    if (icons[index].indexOf('data:') !== 0) {
      icons[index] = origin + icons[index];
    }

    return icons[index];
  }