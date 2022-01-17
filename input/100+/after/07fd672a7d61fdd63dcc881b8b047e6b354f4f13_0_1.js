function(model, collection, options) {
      var childView = new this._childViewConstructor({
        tagName : this._childViewTagName,
        className : this._childViewClass,
        model : model
      });
      
      if (this._childViewFormat) {
        childView.format = this._childViewFormat;
      }
      
      // Add to the top of the list
      if (options.index == 0) {
        this._childViews.unshift(childView);
  
        if (this._rendered) {
          $(this.el).prepend(childView.render().el);
        }
      // Add to the bottom of the list
      } else {
        this._childViews.push(childView);
  
        if (this._rendered) {
          $(this.el).append(childView.render().el);
        }
      }
    }