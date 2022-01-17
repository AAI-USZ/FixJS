function(model) {
      var childView = new this._childViewConstructor({
        tagName : this._childViewTagName,
        className : this._childViewClass,
        model : model
      });
      if (this._childViewFormat) {
        childView.format = this._childViewFormat;
      }

      this._childViews.push(childView);

      if (this._rendered) {
        $(this.el).append(childView.render().el);
      }
    }