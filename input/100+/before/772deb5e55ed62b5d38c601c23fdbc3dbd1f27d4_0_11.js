function(options, callback) {
      if (fetched) { return };

      tiler.show([
        [-1, -1, $('<div class="tile _0"></div>')],
        [ 0,  0, $('<div class="tile _1"></div>')],
        [ 1,  1, $('<div class="tile _2"></div>')]
      ]);

      fetched = true;
    }