function Document (obj, fields, skipId) {
  // node <0.4.3 bug
  if (!this._events) this._events = {};
  this.setMaxListeners(0);

  if ('boolean' === typeof fields) {
    this._strictMode = fields;
    this._selected = fields = undefined;
  } else {
    this._strictMode = this.schema.options && this.schema.options.strict;
    this._selected = fields;
  }

  this.isNew = true;
  this.errors = undefined;
  this._shardval = undefined;
  this._saveError = undefined;
  this._validationError = undefined;
  this._adhocPaths = undefined;
  this._removing = undefined;
  this._inserting = undefined;
  this.__version = undefined;
  this.__getters = {};
  this.__id = undefined;

  this._activePaths = new ActiveRoster;

  var required = this.schema.requiredPaths();
  for (var i = 0; i < required.length; ++i) {
    this._activePaths.require(required[i]);
  }

  this._doc = this._buildDoc(obj, fields, skipId);
  if (obj) this.set(obj, undefined, true);
  this._registerHooks();
}