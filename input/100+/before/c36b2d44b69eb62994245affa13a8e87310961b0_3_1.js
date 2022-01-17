function() {
  var addRadialMarkerStyle, _ref;

  if ((_ref = window.globals) == null) {
    window.globals = {};
  }

  /*
  Removes 'item' from the array 'arr'
  Returns the modified (or unmodified) arr.
  */


  window.arrayRemove = function(arr, item) {
    var index;
    index = arr.indexOf(item);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    return arr;
  };

  /*
  Generated using http://jiminy.medialab.sciences-po.fr/tools/palettes/palettes.php
  Colors: 30
  Hue:       0.0 - 360.00
  Chroma:    0.0 -   1.70
  Lightness: 0.3 -   0.95
  K-means
  */


  globals.getColors = function() {
    return ['#5E5A83', '#609B36', '#DC644F', '#9A8867', '#DA6694', '#40938C', '#A78E20', '#884646', '#546222', '#688CCF', '#529F69', '#415B62', '#AE8188', '#D1762F', '#408FB2', '#B18347', '#944B70', '#9F7FBC', '#C77967', '#914C2A', '#396B43', '#625744', '#C25562', '#735521', '#7D9080', '#715365', '#8A9044', '#C573B2', '#788AA2', '#EC5D7A'];
  };

  /*
  This function should return a list of strings corisponding to the symbols.
  Currently it returns the list of default symbols in Highcharts.
  */


  globals.getSymbols = function() {
    return ['circle', 'square', 'triangle', 'diamond', 'triangle-down'];
  };

  /*
  Eric - You should put your symbol generation code here, then fill in the
         globals.getSymbols function above with the correct strings.
  */


  addRadialMarkerStyle = function(name, points, phase, magnitudes) {
    var extension;
    if (phase == null) {
      phase = 0.0;
    }
    if (magnitudes == null) {
      magnitudes = [1];
    }
    extension = {};
    extension[name] = function(x, y, w, h) {
      var i, modpoints, offset, svg, tx, ty, verticies, vx, vy, _i, _j, _len, _ref1;
      svg = Array();
      verticies = Array();
      offset = phase * 2 * Math.PI;
      modpoints = points * magnitudes.length;
      for (i = _i = 0; 0 <= modpoints ? _i <= modpoints : _i >= modpoints; i = 0 <= modpoints ? ++_i : --_i) {
        tx = (Math.sin(2 * Math.PI * i / modpoints + offset)) * magnitudes[i % magnitudes.length];
        ty = (Math.cos(2 * Math.PI * i / modpoints + offset)) * magnitudes[i % magnitudes.length];
        tx = tx / 2 + 0.5;
        ty = ty / 2 + 0.5;
        verticies.push([tx * w + x, ty * h + y]);
      }
      svg.push("M");
      svg.push(verticies[0][0]);
      svg.push(verticies[0][1]);
      svg.push("L");
      for (_j = 0, _len = verticies.length; _j < _len; _j++) {
        _ref1 = verticies[_j], vx = _ref1[0], vy = _ref1[1];
        svg.push(vx);
        svg.push(vy);
      }
      svg.push("Z");
      return svg;
    };
    return Highcharts.extend(Highcharts.Renderer.prototype.symbols, extension);
  };

  addRadialMarkerStyle('blank', 0);

}