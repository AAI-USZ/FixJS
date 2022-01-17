function (exports) {

  // ### Strings

  exports.trim = function (strlike) {
    return strlike.replace(/^\s+|\s+$/g, '');
  };

  // ### Arrays

  // Delegates to native `Array.isArray(..)` when present
  exports.isArray = function (arrlike) {
    if (Array.isArray) { return Array.isArray(arrlike); }
    return Object.prototype.toString.call(arrlike) === '[object Array]';
  };

  // Collections

  exports.last = function (arrlike) {
    return arrlike[arrlike.length - 1];
  };

  exports.isEmpty = function (objlike) {
    var key;
    for (key in objlike) {
      if (objlike.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };

  // ### Contract-style programming
  //
  // Adding `.assert( .. )` allows for contract-style programming
  // that can be extrememly powerful.
  //
  // `AssertionError` is thrown when an `.assert( .. )` fails, along
  // with the failure message specified.
  function AssertionError(msg) {
    this.__super__.constructor.call(this);
    this.msg = msg;
  }
  AssertionError.prototype = new Error();
  AssertionError.prototype.constructor = AssertionError;
  AssertionError.prototype.__super__ = Error.prototype;

  AssertionError.prototype.toString = function() {
    return 'AssertionError: ' + this.msg;
  };

  exports.assert = function (exp, msg) {
    if (!exp) {
      throw new AssertionError(msg);
    }
  };

  // Send form contents over AJAX.
  // Intercepts the `submit` event, and makes the submission manually.
  exports.ajaxify = function (form) {
    form.addEventListener('submit', function (ev) {
      Utilities.assert(!ev.defaultPrevented, 'Form submit was canceled by another party');
      if (form.checkValidity) {
        Utilities.assert(form.checkValidity(), 'Form inputs invalid');
      }
      ev.preventDefault();
      var req = new Request();
      req.on('success', function (data) {
        console.log(data);
        // TODO Utilities.assert(data['success']);
      });
      req.post(form.action, new FormData(form));
      form.reset();
    });
  };

}(window.Utilities = {}