function(deg){
      var rotate = 'rotate(' + (deg) + 'deg);';
      var tr = new Array(
          'transform:' + rotate,
          '-moz-transform:' + rotate,
          '-webkit-transform:' + rotate,
          '-ms-transform:' + rotate,
          '-o-transform:' + rotate
      );
      var drone = document.getElementById('drone');
      drone.setAttribute('style', tr.join(';'));
  }