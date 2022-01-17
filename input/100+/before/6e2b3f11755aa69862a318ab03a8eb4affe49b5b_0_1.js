function moveUpDown(self, dir) {
    if (self[R][dir]) self.prependTo(self[R][dir]);
    else if (self[L][dir]) self.appendTo(self[L][dir]);
    else {
      var ancestorBlock = self.parent;
      do {
        var prop = ancestorBlock[dir];
        if (prop) {
          if (typeof prop === 'function') prop = ancestorBlock[dir](self);
          if (prop === false || prop instanceof MathBlock) {
            self.upDownCache[ancestorBlock.id] = { parent: self.parent, prev: self[L], next: self[R] };

            if (prop instanceof MathBlock) {
              var cached = self.upDownCache[prop.id];

              if (cached) {
                if (cached[R]) {
                  self.insertBefore(cached[R]);
                } else {
                  self.appendTo(cached.parent);
                }
              } else {
                var pageX = offset(self).left;
                self.appendTo(prop);
                self.seekHoriz(pageX, prop);
              }
            }
            break;
          }
        }
        ancestorBlock = ancestorBlock.parent.parent;
      } while (ancestorBlock);
    }

    return self.clearSelection().show();
  }