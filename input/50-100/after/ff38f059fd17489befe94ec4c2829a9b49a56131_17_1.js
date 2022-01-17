function() {
      var children = this.getVisibleChildren();
      var spacing = this.getSpacing();
      var result = -spacing;
      var i = 0;
      var child = children[ i ];
      while( child != null ) {
        result += child.getOuterWidth() + spacing;
        i++;
        child = children[ i ];
      }
      return result;
    }