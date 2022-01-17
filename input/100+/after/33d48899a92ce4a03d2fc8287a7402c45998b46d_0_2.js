function(e) {
      if (isDrag) {
        delta[0] = (e.pageX - origin[0]) / 2;
        delta[1] = (e.pageY - origin[1]) / 2;
        origin[0] = e.pageX;
        origin[1] = e.pageY;
        transform[0] += delta[0];
        transform[1] += delta[1];
        transform[0] = transform[0] > maxTransform[0] ? maxTransform[0] : transform[0];
        transform[0] = transform[0] < -maxTransform[0] ? -maxTransform[0] : transform[0];
        transform[1] = transform[1] > 0 ? 0 : transform[1];
        transform[1] = transform[1] < -maxTransform[1] ? -maxTransform[1] : transform[1];
        doTransform([transform[0], transform[1]]);
      }
    }