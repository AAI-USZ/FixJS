function() {
      this._dragging = false;
      this.allowDragging = true;
      this.model.on("change:selected", this.__selectionChanged, this);
      this.model.on("change:color", this._colorChanged, this);
      this.model.on("unrender", this._unrender, this);
      this._mouseup = this.stopdrag.bind(this);
      this._mousemove = this.mousemove.bind(this);
      $(document).bind("mouseup", this._mouseup);
      $(document).bind("mousemove", this._mousemove);
      this._deltaDrags = [];
      this.model.on("rerender", this._setUpdatedTransform, this);
      this.model.on("change:x", this._xChanged, this);
      return this.model.on("change:y", this._yChanged, this);
    }