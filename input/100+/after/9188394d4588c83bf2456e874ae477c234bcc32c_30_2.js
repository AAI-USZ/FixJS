function(layout) {
    var changeScale, scale;

    // Font size recalc
    var ime = document.getElementById('keyboard');
    if (window.innerWidth <= window.innerHeight) {
      changeScale = window.innerWidth / 32;
      document.documentElement.style.fontSize = changeScale + 'px';
      ime.classList.remove('landscape');
      ime.classList.add('portrait');
    } else {
      changeScale = window.innerWidth / 64;
      document.documentElement.style.fontSize = changeScale + 'px';
      ime.classList.remove('portrait');
      ime.classList.add('landscape');
    }


    _keyArray = [];

    // Width calc
    if (layout) {
      layoutWidth = layout.width || 10;
      var totalWidth = document.getElementById('keyboard').clientWidth;
      var placeHolderWidth = totalWidth / layoutWidth;

      var ratio, keys, rows = document.querySelectorAll('.keyboard-row');
      for (var r = 0, row; row = rows[r]; r += 1) {
        keys = row.childNodes;
        for (var k = 0, key; key = keys[k]; k += 1) {
          ratio = layout.keys[r][k].ratio || 1;
          key.style.width = (placeHolderWidth * ratio) + 'px';

          // to get the visual width/height of the key
          // for better proximity info
          var visualKey = key.querySelector('.visual-wrapper');

          _keyArray.push({
            code: key.dataset.keycode,
            x: visualKey.offsetLeft,
            y: visualKey.offsetTop,
            width: visualKey.clientWidth,
            height: visualKey.clientHeight
          });
        }
      }
    }
  }