function() {
  var _ref;

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


  globals.colors = ['#5E5A83', '#609B36', '#DC644F', '#9A8867', '#DA6694', '#40938C', '#A78E20', '#884646', '#546222', '#688CCF', '#529F69', '#415B62', '#AE8188', '#D1762F', '#408FB2', '#B18347', '#944B70', '#9F7FBC', '#C77967', '#914C2A', '#396B43', '#625744', '#C25562', '#735521', '#7D9080', '#715365', '#8A9044', '#C573B2', '#788AA2', '#EC5D7A'];

  /*
  This function should return a list of strings corisponding to the symbols.
  Currently it returns the list of default symbols in Highcharts.
  */


  globals.symbols = ['circle', 'square', 'triangle', 'diamond', 'triangle-down'];

  /*
  Eric - You should put your symbol generation code here, then fill in the
         globals.getSymbols function above with the correct strings.
  */


}