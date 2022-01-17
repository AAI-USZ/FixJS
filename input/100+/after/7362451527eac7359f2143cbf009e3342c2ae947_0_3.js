function (zap) {
  "use strict";

  var A = Array.prototype;

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = /*window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame || window.oRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||*/ function (f) {
      window.setTimeout(function () {
        f(Date.now());
      }, 15);
    };
  }

  // Simple format function for messages and templates. Use {0}, {1}...
  // as slots for parameters. Missing parameters are note replaced.
  String.prototype.fmt = function () {
    var args = [].slice.call(arguments);
    return this.replace(/\{(\d+)\}/g, function (s, p) {
      return args[p] === undefined ? "" : args[p];
    });
  };

  // Another format function for messages and templates; this time, the only
  // argument is an object and string parameters are keys.
  String.prototype.format = function (args) {
    return this.replace(/\{([^}]*)\}/g, function (s, p) {
      return args.hasOwnProperty(p) ? args[p] : "";
    });
  };

  // Useful XML namespaces
  zap.SVG_NS = "http://www.w3.org/2000/svg";
  zap.XHTML_NS = "http://www.w3.org/1999/xhtml";
  zap.XLINK_NS = "http://www.w3.org/1999/xlink";
  zap.XML_NS = "http://www.w3.org/1999/xml";
  zap.XMLNS_NS = "http://www.w3.org/2000/xmlns/";
  zap.HTML_NS = zap.XHTML_NS;

  // Return the value constrained between min and max; NaN is converted to 0
  zap.clamp = function (value, min, max) {
    return Math.max(Math.min(isNaN(value) ? 0 : value, max), min);
  };

  // Simple way to create elements, giving ns id and class directly within the
  // name of the element (e.g. svg:rect#background.test) Beware of calling this
  // function with `this` set to the target document.
  zap.create_element = function (name, maybe_attrs) {
    var argc = 1;
    var attrs = {};
    if (typeof maybe_attrs === "object" && !(maybe_attrs instanceof window.Node)) {
      attrs = maybe_attrs;
      argc = 2;
    }
    var classes = name.split(".");
    var tagname = classes.shift();
    if (classes.length > 0) {
      attrs["class"] =
        (attrs.hasOwnProperty("class") ? attrs["class"] + " " : "")
        + classes.join(" ");
    }
    var m = tagname.match(/^(?:(\w+):)?([\w.\-]+)(?:#([\w:.\-]+))?$/);
    if (m) {
      var ns = (m[1] && zap[m[1].toUpperCase() + "_NS"]) ||
        this.documentElement.namespaceURI;
      var elem = ns ? this.createElementNS(ns, m[2]) : this.createElement(m[2]);
      if (m[3]) {
        attrs.id = m[3];
      }
      for (var a in attrs) {
        if (attrs.hasOwnProperty(a) &&
            attrs[a] !== undefined && attrs[a] !== null) {
          var split = a.split(":");
          ns = split[1] && zap[split[0].toUppserCase() + "_NS"];
          if (ns) {
            elem.setAttributeNS(ns, split[1], attrs[a]);
          } else {
            elem.setAttribute(a, attrs[a]);
          }
        }
      }
      A.forEach.call(arguments, function (ch, i) {
        if (i >= argc) {
          if (typeof ch === "string") {
            elem.appendChild(this.createTextNode(ch));
          } else if (ch instanceof Node) {
            elem.appendChild(ch);
          }
        }
      }, this);
      return elem;
    }
  };

  // Shortcut to create elements
  window.$ = function () {
    return zap.create_element.apply(window.document, arguments);
  };

  // Shortcut for HTML and SVG elements: the element name prefixed by a $ sign
  // Cf. http://dev.w3.org/html5/spec/section-index.html#elements-1
  ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base",
    "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption",
    "cite", "code", "col", "colgroup", "command", "datalist", "dd", "del",
    "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset",
    "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5",
    "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img",
    "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "map",
    "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol",
    "optgroup", "option", "output", "p", "param", "pre", "progress", "q",
    "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small",
    "source", "span", "strong", "style", "sub", "summary", "sup", "table",
    "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr",
    "tref", "track", "u", "ul", "var", "video", "wbr"].forEach(function (tag) {
    window["$" + tag] = zap.create_element.bind(window.document, tag);
  });

  // SVG elements (ommitted: a, color-profile, font-face, font-face-format,
  // font-face-name, font-face-src, font-face-uri, missing-glyph, script, style,
  // title)
  // Cf. http://www.w3.org/TR/SVG/eltindex.html
  ["altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor",
    "animateMotion", "animateTransform", "circle", "clipPath", "cursor", "defs",
    "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer",
    "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap",
    "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR",
    "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology",
    "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile",
    "feTurbulence", "filter", "font", "foreignObject", "g", "glyph", "glyphRef",
    "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata",
    "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect",
    "set", "stop", "svg", "switch", "symbol", "text", "textPath",
    "tref", "tspan", "view", "vkern"].forEach(function (tag) {
    window["$" + tag] = zap.create_element.bind(window.document, "svg:" + tag);
  });

  // $use takes an initial xlink:href attribute to simplify its creation
  // TODO other elements that use xlink:href
  window.$use = function (href) {
    var use = zap.create_element.apply(window.document,
        ["svg:use"].concat(A.slice.call(arguments, 1)));
    use.setAttributeNS(zap.XLINK_NS, "href", href);
    return use;
  };

  // Degree to radian conversion
  zap.deg2rad = function (a) {
    return a / 180 * Math.PI;
  };

  // Radian to degree conversion
  zap.rad2deg = function (th) {
    return th / Math.PI * 180;
  };

  // Pad a string to the given length with the given padding (defaults to 0)
  zap.pad = function(string, length, padding) {
    if (typeof padding !== "string") padding = "0";
    if (typeof string !== "string") string = string.toString();
    var l = length + 1 - string.length;
    return l > 0 ? (Array(l).join(padding)) + string : string;
  };

  // Return a random element from an array
  zap.random_element = function (a) {
    return a[zap.random_int(a.length - 1)];
  };

  // Return a random integer in the [min, max] range
  zap.random_int = function (min, max) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max + 1 - min));
  };

  // Return a random integer between -n/2 and n/2
  zap.random_int_around = function (n) {
    return Math.round((n / 2) - Math.random() * (n + 1));
  };

  // Generate a random integer in the [-max, -min] U [min, max] range
  zap.random_int_signed = function (min, max) {
    return zap.random_int(min, max) * (Math.random() < 0.5 ? -1 : 1);
  }

  // Return a random number in the [min, max[ range
  zap.random_number = function(min, max) {
    return min + Math.random() * (max - min);
  };

  // Remap a value from a given range to another range (from Processing)
  zap.remap = function (value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  };

  // Remove all children of an element
  zap.remove_children = function (elem) {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild);
    }
  };

  // Remove an item from an array
  zap.remove_from_array = function (array, item) {
    if (array) {
      var index = array.indexOf(item);
      if (index >= 0) {
        return array.splice(index, 1)[0];
      }
    }
  };

  // A layer is any SVG element that contains sprite.
  zap.update_layer = function (layer, dt) {
    if (layer.sprites && dt > 0) {
      layer.sprites.forEach(function (sprite) {
        sprite.update(dt);
      });
    }
  };


  // Color functions

  // Yes, these are the colors from d3.js in case anybody asks
  // https://github.com/mbostock/d3/wiki/Ordinal-Scales#wiki-category10
  // TODO come up with own palette
  zap.color_10 = function(n) {
    var colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
      "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
    if (!n) {
      n = zap.random_int(0, colors.length);
    }
    return colors[Math.abs(n % colors.length)];
  };

  zap.color_20 = function(n) {
    var colors = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
      "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b",
      "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22",
      "#dbdb8d", "#17becf", "#9edae5"];
    if (!n) {
      n = zap.random_int(0, colors.length);
    }
    return colors[Math.abs(n % colors.length)];
  };

  // Convert a color from hsv space (hue in radians, saturation and brightness
  // in the [0, 1] range) to RGB, returned as an array in the [0, 256[ range.
  zap.hsv_to_rgb = function(h, s, v) {
    s = zap.clamp(s, 0, 1);
    v = zap.clamp(v, 0, 1);
    if (s === 0) {
      var v_ = Math.round(v * 255);
      return [v_, v_, v_];
    } else {
      h = (((h * 180 / Math.PI) + 360) % 360) / 60;
      var i = Math.floor(h);
      var f = h - i;
      var p = v * (1 - s);
      var q = v * (1 - (s * f));
      var t = v * (1 - (s * (1 - f)));
      return [Math.round([v, q, p, p, t, v][i] * 255),
        Math.round([t, v, v, q, p, p][i] * 255),
        Math.round([p, p, t, v, v, q][i] * 255)];
    }
  };

  // Convert a color from hsv space (hue in degrees, saturation and brightness
  // in the [0, 1] range) to an RGB hex value
  zap.hsv_to_hex = function(h, s, v) {
    return zap.rgb_to_hex.apply(this, zap.hsv_to_rgb(h, s, v));
  };

  // Convert an RGB color (3 values in the 0..255 range) to a hex value
  zap.rgb_to_hex = function(r, g, b) {
    return "#" + A.map.call(arguments, function (x) {
        return zap.pad(x.toString(16), 2, "0");
      }).join("");
  };

  // Convert an sRGB color (3 values in the 0..1 range) to a hex value
  zap.srgb_to_hex = function(r, g, b) {
    return "#" + [].map.call(arguments, function (x) {
        return zap.pad(Math.floor(x * 255).toString(16), 2, "0");
      }).join("");
  };


  // Sprites
  zap.sprite = {

    angle: function (a) {
      this.a = (a + 360) % 360;
      this.set_position();
      this.elem.setAttribute("transform", "translate({x}, {y}) rotate({a})"
        .format(this));
    },

    position: function (x, y, a) {
      this.x = x;
      this.y = y;
      if (typeof a === "number") {
        this.angle(a);
      } else {
        this.set_position();
        this.elem.setAttribute("transform", "translate({x}, {y}) rotate({a})"
          .format(this));
      }
    },

    remove: function () {
      if (this.parent) {
        this.parent.sprites.splice(this.parent.sprites.indexOf(this), 1);
      }
      this.elem.parentNode.removeChild(this.elem);
      delete this.parent;
      delete this.cosmos;
    },

    set_position: function () {},

    update: function (dt) {
      this.angular_velocity += this.angular_acceleration;
      this.velocity += this.acceleration;
      this.position(this.x + this.vx * dt, this.y + this.vy * dt,
        this.a + this.va * dt);
      if (this.hasOwnProperty("ttl")) {
        this.ttl -= dt;
        if (this.ttl < 0) {
          this.remove();
        }
      }
      zap.update_layer(this, dt);
    },
  };

  // Initialize a sprite with its element, parent (another sprite or a layer)
  zap.make_sprite = function (elem, parent, proto) {
    var sprite = Object.create(proto || zap.sprite);
    sprite.elem = elem;
    sprite.sprites = [];
    sprite.x = 0;
    sprite.y = 0;
    sprite.a = 0;
    sprite.vx = 0;
    sprite.vy = 0;
    sprite.va = 0;

    var angular_velocity;
    Object.defineProperty(sprite, "angular_velocity", { enumerable: true,
      get: function () {
        return angular_velocity;
      }, set: function (v) {
        if (!isNaN(v)) {
          angular_velocity =
            zap.clamp(v, 0, this.max_angular_velocity || Infinity);
        }
      } });

    var velocity;
    Object.defineProperty(sprite, "velocity", { enumerable: true,
      get: function () {
        return velocity;
      }, set: function (v) {
        if (!isNaN(v)) {
          velocity = zap.clamp(v, 0, this.max_velocity || Infinity);
          var th = this.a / 180 * Math.PI;
          this.vx = velocity * Math.cos(th);
          this.vy = velocity * Math.sin(th);
        }
      } });

    if (!parent.sprites) {
      parent.sprites = [];
    }
    parent.sprites.push(sprite);
    sprite.parent = parent;
    sprite.cosmos = parent.cosmos;
    if (!sprite.elem.parentNode) {
      if (parent instanceof window.Node) {
        parent.appendChild(sprite.elem);
      } else {
        parent.elem.parentNode.appendChild(sprite.elem);
      }
    }
    return sprite;
  };

  // A particle is simply a sprite with its ttl property set
  zap.make_particle = function (elem, parent, ttl, proto) {
    var p = zap.make_sprite(elem, parent, proto);
    p.ttl = ttl;
    return p;
  };

  // This is the main object for a game
  zap.cosmos = {

    add_layer: function (layer) {
      this.layers.push(layer);
      layer.cosmos = this;
      return layer;
    },

    update: function (t) {
      if (this.running) {
        var dt = (t - this.t_last) / 1000;
        this.t_last = t;
        this.layers.forEach(function (layer) {
          zap.update_layer(layer, dt);
        });
        window.requestAnimationFrame(this.update.bind(this));
        this.updated(dt);
      }
    },

    updated: function () {}
  };

  zap.make_cosmos = function (proto) {
    var cosmos = Object.create(proto || zap.cosmos);
    cosmos.layers = [];
    var running = false;
    Object.defineProperty(cosmos, "running", { enumerable: true,
      get: function () {
        return running;
      }, set: function (p) {
        running = !!p;
        cosmos.t_last = Date.now();
        if (running) {
          window.requestAnimationFrame(this.update.bind(this));
        }
      } });
    return cosmos;
  };

  // Parameters
  A.forEach.call(document.querySelectorAll("[data-param]"), function (p) {
    if (p.dataset.hasOwnProperty("num")) {
      window["$" + p.dataset.param] = parseFloat(p.dataset.num);
    } else {
      window["$" + p.dataset.param] = p.textContent;
    }
  });

  // Init audio (this is adapted from Perlenspiel)
  // If the ZAP_AUDIO_CHANNELS parameter is not set, we assume no audio
  zap.play_sound = (function () {
    if (typeof $ZAP_AUDIO_CHANNELS !== "number") {
      return;
    }
    var channels = [];
    for (var i = 0; i < $ZAP_AUDIO_CHANNELS; ++i) {
      channels[i] = new Audio();
      channels[i]._done = -1;
    }
    return function (id, volume) {
      var sound = document.getElementById(id);
      if (volume >= 0 && volume <= 1) {
        sound.volume = volume;
      }
      for (var i = 0; i < $ZAP_AUDIO_CHANNELS; ++i) {
        var t = Date.now();
        var channel = channels[i];
        if (channel._done < t) {
          channel._done = t + (sound.duration * 1000);
          channel.audio = sound;
          sound.load();
          sound.play();
          return;
        }
      }
    }
  }());

}(window.zap = {