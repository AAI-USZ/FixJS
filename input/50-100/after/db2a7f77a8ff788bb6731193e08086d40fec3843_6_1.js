function(jobs)
    {
      if (this.__useWidgetCells !== null) {
        return;
      }

      this.__useWidgetCells = this.getUseWidgetCells();

      if (this.__useWidgetCells) {
        this._initWidgetLayer();
      } else {
        this._initHtmlLayer();
      }
    }