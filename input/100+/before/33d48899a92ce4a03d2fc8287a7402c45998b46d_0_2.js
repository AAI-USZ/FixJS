function(e) {
      if (isDrag) {
        delta[0] = (e.pageX - origin[0]) / 2;
        delta[1] = (e.pageY - origin[1]) / 2;
        newTransform[0] = transform[0] + delta[0];
        newTransform[1] = transform[1] + delta[1];
        newTransform[0] = newTransform[0] > maxTransform[0] ? maxTransform[0] : newTransform[0];
        newTransform[0] = newTransform[0] < -maxTransform[0] ? -maxTransform[0] : newTransform[0];
        newTransform[1] = newTransform[1] > 0 ? 0 : newTransform[1];
        newTransform[1] = newTransform[1] < -maxTransform[1] ? -maxTransform[1] : newTransform[1];
        doTransform([newTransform[0], newTransform[1]]);
      }
    }