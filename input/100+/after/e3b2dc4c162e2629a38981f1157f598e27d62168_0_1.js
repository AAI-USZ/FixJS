function() {

  function BeJS() {}

  BeJS.prototype.injection_rx = new RegExp('\'"\\\;%+()', 'g');

  BeJS.prototype.environment = 'browser';

  BeJS.prototype._quiet = true;

  BeJS.prototype.verbose = function() {
    return this._quiet = false;
  };

  BeJS.prototype.quiet = function() {
    return this._quiet = true;
  };

  BeJS.prototype.time = function(value) {
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

  BeJS.prototype.paranoid_safe = function(value) {
    if (value === null) {
      return '';
    }
    return value.replace(injection_rx, '');
  };

  BeJS.prototype.safe = function(value) {
    if (value === null) {
      return '';
    }
    return value.replace(injection_rx, "\\$1");
  };

  BeJS.prototype.slug = function(value) {
    if (value === null) {
      return '';
    }
    return value.replace(/\W+/g, '_').replace(/[^\W]$/, '');
  };

  BeJS.prototype.strip = function(value) {
    if (value === null) {
      return '';
    }
    return value.replace(/(^ +| +$)/g, '');
  };

  BeJS.prototype.capitalized = function(value) {
    if (value === null) {
      return '';
    }
    return value.replace(/(\b[a-z])/g, '_BeJS_CAP_$1').split(/_BeJS_CAP_/).map(function(w) {
      return (w[0] || '').toUpperCase() + w.substring(1);
    }).join('');
  };

  BeJS.prototype.monkey_patch = function(clazz) {
    var k, patch, v;
    if (clazz === null) {
      return null;
    }
    if (['String', 'Number'].indexOf(clazz.name) === -1) {
      throw new Error('can only patch String and Number');
    }
    for (k in be) {
      v = be[k];
      if (typeof v === 'function' && clazz.name.toLowerCase() === typeof (v(null))) {
        if (this._quiet) {
          console.log(">>> patching '", k, "' function into", clazz.name, "class");
        }
        patch = "be['" + k + "'](this)";
        clazz.prototype[k] = function() {
          return eval(patch);
        };
      }
    }
    if (this._quiet) {
      return void 0;
    } else {
      return clazz.name + ' patched!';
    }
  };

  return BeJS;

}