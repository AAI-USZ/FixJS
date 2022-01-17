function() {
  var drawingArea = $.document().query$1('#drawingArea');
  var ctx = drawingArea.getContext$1('2d');
  ctx.clearRect$4(2, 2, drawingArea.get$width(), drawingArea.get$height());
  ctx.fillRect$4(this.ball.get$pos_X(), this.ball.get$pos_Y(), this.ball.get$size(), this.ball.get$size());
  var t1 = this.snake;
  switch (t1.get$direction()) {
    case 'left':
      ctx.set$fillStyle('red');
      ctx.fillRect$4(t1.get$pos_X(), t1.get$pos_Y(), 1, 10);
      ctx.set$fillStyle('black');
      for (var i = 1; $.ltB(i, $.get$length(t1.get$parts())); ++i) {
        ctx.fillRect$4($.add(t1.get$pos_X(), i), t1.get$pos_Y(), 1, 10);
      }
      break;
    case 'right':
      ctx.set$fillStyle('red');
      ctx.fillRect$4(t1.get$pos_X(), t1.get$pos_Y(), 1, 10);
      ctx.set$fillStyle('black');
      for (i = 1; $.ltB(i, $.get$length(t1.get$parts())); ++i) {
        ctx.fillRect$4($.sub(t1.get$pos_X(), i), t1.get$pos_Y(), 1, 10);
      }
      break;
    case 'up':
      ctx.set$fillStyle('red');
      ctx.fillRect$4(t1.get$pos_X(), t1.get$pos_Y(), 10, 1);
      ctx.set$fillStyle('black');
      for (i = 1; $.ltB(i, $.get$length(t1.get$parts())); ++i) {
        ctx.fillRect$4(t1.get$pos_X(), $.add(t1.get$pos_Y(), i), 10, 1);
      }
      break;
    case 'down':
      ctx.set$fillStyle('red');
      ctx.fillRect$4(t1.get$pos_X(), t1.get$pos_Y(), 10, 1);
      ctx.set$fillStyle('black');
      for (i = 1; $.ltB(i, $.get$length(t1.get$parts())); ++i) {
        ctx.fillRect$4(t1.get$pos_X(), $.sub(t1.get$pos_Y(), i), 10, 1);
      }
      break;
  }
  if (t1.touchesWall$1(drawingArea) === true) {
    this.writeStatus$1('Game over!');
    $.indexSet($.document().get$window().get$localStorage(), 'highscore', $.toString(t1.get$points()));
    $.document().get$window().clearInterval$1(this._intervalId);
    $.document().get$on().get$keyPress().remove$1(this.get$onKeyPress());
  }
  if (t1.catches$1(this.ball) === true) {
    this.write$1('Points: ' + $.S(t1.get$points()));
    this.ball = $.Ball$0();
  }
 }