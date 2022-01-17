function() {
  var dummyTiles = [
    [-1, -1, $('<div class="tile _0">1</div>')],
    [ 0, -1, $('<div class="tile _1">2</div>')],
    [ 1, -1, $('<div class="tile _2">3</div>')],
    [ 2, -1, $('<div class="tile _3">4</div>')],
    [-1,  0, $('<div class="tile _4">5</div>')],
    [ 0,  0, $('<div class="tile _5">6</div>')],
    [ 1,  0, $('<div class="tile _6">7</div>')],
    [ 2,  0, $('<div class="tile _7">8</div>')],
    [-1,  1, $('<div class="tile _8">9</div>')],
    [ 0,  1, $('<div class="tile _9">10</div>')],
    [ 1,  1, $('<div class="tile _10">11</div>')],
    [ 2,  1, $('<div class="tile _11">12</div>')],
    [-1,  2, $('<div class="tile _12">13</div>')],
    [ 0,  2, $('<div class="tile _13">14</div>')],
    [ 1,  2, $('<div class="tile _14">15</div>')],
    [ 2,  2, $('<div class="tile _15">16</div>')]];

  var calls = 0;
  var tiler = createTiler({
    fetch: function(options, callback) {
      calls++;
      if (calls == 1) {
        tiler.show(dummyTiles);
      }
    }
  });

  tiler.refresh();
  tiler.element.height(100);
  tiler.element.width(100);
  tiler.refresh();

  ok(!tiler.element.find('.tile._3').length);
  ok(!tiler.element.find('.tile._7').length);
  ok(!tiler.element.find('.tile._11').length);
  ok(!tiler.element.find('.tile._12').length);
  ok(!tiler.element.find('.tile._13').length);
  ok(!tiler.element.find('.tile._14').length);
  ok(!tiler.element.find('.tile._15').length);

  tiler.element.remove();
}