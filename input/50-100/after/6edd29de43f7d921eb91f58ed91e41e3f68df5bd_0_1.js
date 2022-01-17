function(e) {
      if (!this._open) {
        return;
      }

      if (JX.Stratcom.pass(e)) {
        return;
      }

      var t = e.getTarget();
      while (t) {
        if (t == this._menu || t == this._node) {
          return;
        }
        t = t.parentNode;
      }

      this.close();
    }