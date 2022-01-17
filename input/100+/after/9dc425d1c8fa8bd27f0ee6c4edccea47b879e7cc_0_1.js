function () {
    var rots = [CubeRotation.identity.code,
                CubeRotation.y90.code,
                CubeRotation.y180.code,
                CubeRotation.y270.code];
    var blocks = Object.keys(t.ls).map(function (k) { return t.ls[k]; });
    function pickBlock(x,y,z,cont) {
      blocks.forEach(function (id) {
        rots.forEach(function (subdatum) {
          t.world.s(x,y,z,id,subdatum);
          cont();
        });
      });
    }
    
    t.world.s(0,1,1, t.ls.constant, 0);
    t.world.s(1,1,0, t.ls.constant, 1);
    t.world.s(2,1,1, t.ls.indicator);
    pickBlock(1,1,1, function () {
      pickBlock(1,1,2, function () {
      });
    });
  }