function(renderContext) {
        renderContext = renderContext || p;
        if (this.visible) {
          this.pre(renderContext);
          this.drawImpl(renderContext);
          this.post(renderContext);
        }
      }