function SliderBarr(userSettings) {
      this._onMouseup = __bind(this._onMouseup, this);
      this._onSliderClick = __bind(this._onSliderClick, this);
      this._onHandleMousemove = __bind(this._onHandleMousemove, this);
      this._onHandleMousedown = __bind(this._onHandleMousedown, this);
      this._onHandleKeydown = __bind(this._onHandleKeydown, this);      this._settings = {
        el: null,
        max: 100,
        min: 0,
        value: 25,
        bar: true,
        labels: false,
        step: 1,
        onChange: null,
        onDrag: null
      };
      this._activeDrag = false;
      this._sliderAttr = {};
      this._cache = [];
      $.extend(this._settings, userSettings);
      this._validateHandles();
      this._render();
      if (this._settings.labels) this._renderEdgeLabels();
      this._initSelectors();
      this._initEvents();
      this._renderHandleChanges();
    }