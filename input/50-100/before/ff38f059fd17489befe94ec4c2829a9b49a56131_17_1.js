function()
    {
      var ch = this.getVisibleChildren(), chc, i = -1, sp = this.getSpacing(), s = -sp;

      while (chc = ch[++i]) {
        s += chc.getOuterWidth() + sp;
      }

      return s;
    }