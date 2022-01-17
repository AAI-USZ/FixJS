function() {
  var _ref;
  if (Ext.isFunction((_ref = Ext.Logger) != null ? _ref.log : void 0)) {
    this.log = Ext.bind(Ext.Logger.log, Ext.Logger);
  } else if (Ext.isFunction(Ext.log)) {
    this.log = function(message, priority) {
      if (priority == null) {
        priority = 'info';
      }
      if (priority === 'deprecate') {
        priority = 'warn';
      }
      Ext.log({
        msg: message,
        level: priority
      });
    };
  }
}