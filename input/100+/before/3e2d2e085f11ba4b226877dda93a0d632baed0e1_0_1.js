function (layer) {
        layer.setAttribute("transform", "translate({0}, {1}) rotate({2})".fmt(
            zap.random_int_around(this.shaking.amp),
            zap.random_int_around(this.shaking.amp),
            zap.random_int_around(this.shaking.amp)));
      }