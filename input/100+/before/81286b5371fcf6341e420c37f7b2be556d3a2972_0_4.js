function() {
  var BeJS, be,
    __slice = [].slice;

  BeJS = (function() {

    BeJS.injection_rx = new RegExp('([\'"<>\\$`\\[\\]()\\\\\\;%\\+])', 'g');

    BeJS.version = '0.1.0';

    BeJS.quiet = true;

    function BeJS(doMonkeyPatch, verbose) {
      var clazz, _i, _len, _ref;
      if (doMonkeyPatch == null) {
        doMonkeyPatch = false;
      }
      if (verbose == null) {
        verbose = false;
      }
      if (doMonkeyPatch) {
        _ref = [String, Number];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          clazz = _ref[_i];
          this.monkeyPatch(clazz);
        }
      }
      this.environment = 'browser';
      BeJS.quiet = !verbose;
      this.environment = (typeof process !== "undefined" && process !== null) && process.title === 'node' ? 'node' : 'browser';
    }

    BeJS.prototype.verbose = function() {
      return BeJS.quiet = false;
    };

    BeJS.prototype.quiet = function() {
      return BeJS.quiet = true;
    };

    /*
      Number functions
    */


    BeJS.prototype.shownAsTime = function(value) {
      var h, m, s;
      if (value === null) {
        return 0;
      }
      if (value === 'BeJS_monkey_patch') {
        return [Number];
      }
      if (value === 0 || (typeof value === !'number')) {
        return '00:00:00';
      }
      s = Math.floor((value / 1000) % 60);
      m = Math.floor(((value / 1000) / 60) % 60);
      h = Math.floor(((value / 1000) / 60) / 60);
      return "" + (h > 9 ? '' : '0') + h + ":" + (m > 9 ? '' : '0') + m + ":" + (s > 9 ? '' : '0') + s;
    };

    /*
      String functions
    */


    BeJS.prototype.sanitized = function(value) {
      if (value === null) {
        return '';
      }
      return value.toString().replace(this.injection_rx, '');
    };

    BeJS.prototype.safe = function(value) {
      if (value === null) {
        return '';
      }
      return value.toString().replace(this.injection_rx, "\\$1");
    };

    BeJS.prototype.stripped = function(value) {
      if (value === null) {
        return '';
      }
      return value.toString().replace(/(^ +| +$)/g, '');
    };

    BeJS.prototype.slugified = function(value) {
      if (value === null) {
        return '';
      }
      return this.stripped(value.toString().toLowerCase()).replace(/\W+/g, '_').replace(/_+$/g, '');
    };

    BeJS.prototype.capitalized = function(value) {
      if (value === null) {
        return '';
      }
      return value.toString().toLowerCase().replace(/(\b[a-z])/g, '_BeJS_CAP_$1').split(/_BeJS_CAP_/).map(function(w) {
        return (w[0] || '').toUpperCase() + w.substring(1);
      }).join('');
    };

    BeJS.prototype.sentence = function() {
      var array;
      array = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this._isArray.apply(this, array)) {
        array = array[0];
      }
      if (array.length === 1) {
        return array[0];
      }
      return [this._withoutLast.apply(this, array).join(', '), this._last.apply(this, array)].join(' and ');
    };

    /*
      Monkey Patcher
      Expands String and Number classes by embedding functions into their prototypes
    */


    BeJS.prototype.monkeyPatched = function(clazz) {
      var k, v;
      if (clazz === null) {
        return null;
      }
      if (['String', 'Number'].indexOf(clazz.name) === -1) {
        throw new Error('can only patch String and Number');
      }
      for (k in be) {
        v = be[k];
        if (typeof v === 'function' && clazz.name.toLowerCase() === typeof (v(null))) {
          if (!BeJS.quiet) {
            console.log(">>> patching '", k, "' function into", clazz.name, "class");
          }
          eval(clazz.name + (".prototype['" + k + "'] = function () { return be['" + k + "'](this) };"));
        }
      }
      if (this.be_quiet) {
        return void 0;
      } else {
        return clazz.name + ' patched!';
      }
    };

    /*
       Internals
    */


    BeJS.prototype._withoutLast = function() {
      var passed_array;
      passed_array = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return passed_array.slice(0, passed_array.length - 1);
    };

    BeJS.prototype._last = function() {
      var passed_array;
      passed_array = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return passed_array.slice(-1);
    };

    BeJS.prototype._isArray = function(obj) {
      return toString.call(obj) === '[object Array]';
    };

    BeJS.prototype._isFunction = function(obj) {
      return toString.call(obj) === '[object Function]';
    };

    BeJS.prototype._isDate = function(obj) {
      return toString.call(obj) === '[object Date]';
    };

    return BeJS;

  })();

  be = new BeJS();

  if (be.environment === 'node') {
    module.exports = be;
  } else {
    window.be = be;
  }

}