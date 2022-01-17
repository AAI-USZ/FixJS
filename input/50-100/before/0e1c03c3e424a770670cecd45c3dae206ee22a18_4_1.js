function (data) {
      var widgetName = this._widgetName(data);
      data.disabled = false;
      if (typeof jQuery(data.element)[widgetName] !== 'function') {
        throw new Error(widgetName + ' widget is not available');
      }
      jQuery(data.element)[widgetName](data);
      jQuery(data.element).data('createWidgetName', widgetName);
      return jQuery(data.element);
    }