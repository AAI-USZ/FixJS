function(id, opt_doc) {
  goog.events.EventTarget.call(this);

  /**
   * The id for this editable field, which must match the id of the element
   * associated with this field.
   * @type {string}
   */
  this.id = id;

  /**
   * The hash code for this field. Should be equal to the id.
   * @type {string}
   * @private
   */
  this.hashCode_ = id;

  /**
   * Dom helper for the editable node.
   * @type {goog.dom.DomHelper}
   * @protected
   */
  this.editableDomHelper = null;

  /**
   * Map of class id to registered plugin.
   * @type {Object}
   * @private
   */
  this.plugins_ = {};


  /**
   * Plugins registered on this field, indexed by the goog.editor.Plugin.Op
   * that they support.
   * @type {Object.<Array>}
   * @private
   */
  this.indexedPlugins_ = {};

  for (var op in goog.editor.Plugin.OPCODE) {
    this.indexedPlugins_[op] = [];
  }


  /**
   * Additional styles to install for the editable field.
   * @type {string}
   * @protected
   */
  this.cssStyles = '';

  // Work around bug https://bugs.webkit.org/show_bug.cgi?id=19086 in affected
  // versions of Webkit by specifying 1px right margin on all immediate children
  // of the editable field. This works in most (but not all) cases.
  // Note. The fix uses a CSS rule which may be quite expensive, especially
  //       in BLENDED mode. Currently this is the only known wokraround.
  // TODO(user): The bug was fixed in community Webkit but not included in
  //       Safari yet. Verify that the next Safari release after 525.18 is
  //       unaffected.
  if (goog.userAgent.WEBKIT && goog.userAgent.isVersion('525.13') &&
      goog.string.compareVersions(goog.userAgent.VERSION, '525.18') <= 0) {
    this.workaroundClassName_ = goog.getCssName('tr-webkit-workaround');
    this.cssStyles = '.' + this.workaroundClassName_ + '>*{padding-right:1}';
  }

  // The field will not listen to change events until it has finished loading
  this.stoppedEvents_ = {};
  this.stopEvent(goog.editor.Field.EventType.CHANGE);
  this.stopEvent(goog.editor.Field.EventType.DELAYEDCHANGE);
  this.isModified_ = false;
  this.isEverModified_ = false;
  this.delayedChangeTimer_ = new goog.async.Delay(this.dispatchDelayedChange_,
      goog.editor.Field.DELAYED_CHANGE_FREQUENCY, this);

  this.debouncedEvents_ = {};
  for (var key in goog.editor.Field.EventType) {
    this.debouncedEvents_[goog.editor.Field.EventType[key]] = 0;
  }

  if (goog.editor.BrowserFeature.USE_MUTATION_EVENTS) {
    this.changeTimerGecko_ = new goog.async.Delay(this.handleChange,
        goog.editor.Field.CHANGE_FREQUENCY, this);
  }

  /**
   * @type {goog.events.EventHandler}
   * @protected
   */
  this.eventRegister = new goog.events.EventHandler(this);

  // Wrappers around this field, to be disposed when the field is disposed.
  this.wrappers_ = [];

  this.loadState_ = goog.editor.Field.LoadState_.UNEDITABLE;

  var doc = opt_doc || document;

  /**
   * @type {!goog.dom.DomHelper}
   * @protected
   */
  this.originalDomHelper = goog.dom.getDomHelper(doc);

  /**
   * @type {Element}
   * @protected
   */
  this.originalElement = this.originalDomHelper.getElement(this.id);

  // Default to the same window as the field is in.
  this.appWindow_ = this.originalDomHelper.getWindow();
}