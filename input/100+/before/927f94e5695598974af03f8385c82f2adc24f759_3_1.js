function () {
    var tabContainer = vegas.tpl('tabContainer', this._getTemplateVariables());
    this.getRegion().getElement().find('.tabs').append(tabContainer);
    if (!this._attachedEvents) {
      this._attachEvents();
    }
  }