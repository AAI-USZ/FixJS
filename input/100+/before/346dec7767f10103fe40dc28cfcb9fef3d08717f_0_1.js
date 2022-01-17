function (window, undefined) {
  
  // DOM4 MutationObserver http://dvcs.w3.org/hg/domcore/raw-file/tip/Overview.html#mutation-observers
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

  var
      debug = false,
      Sprig,
      $ = global.jQuery
          || (typeof require == 'function' && (require("jquery") || require("jQuery")))
          || (function () {
        throw "Sprig requires jQuery";
      })(),
      log = function () {
        if (!debug) {
          return log = function () { }; // Silence the log
        }
        console.log.apply(console, arguments);
      },
      camel2data = function (camelStr) {
        return camelStr.replace(/([A-Z]){1}/g, function (s) {
          return "-" + s.toLowerCase()
        })
      },
      // Use a wrapper around the dataset instead of jquery because we need the dataset to be in sync with data-* attributes
      // Only for compatibility reasons
      $D = function (el) {
        if (!el.__sprigDataAccessor__) {

          if (el.dataset) {
            el.__sprigDataAccessor__ = {
              "set": function (key, val) {
                el.dataset[key] = val;
              },
              "get": function (key) {
                return key ? el.dataset[key] : el.dataset;
              }
            }
          }
          else {
            el.__sprigDataAccessor__ = (function () {
              var dataset = $.extend({}, $(el).data());
              return {
                "set": function (key, val) {
                  dataset[key] = val;
                  el.setAttribute(camel2data(key), val);
                },
                "get": function (key) {
                  return key ? dataset[key] : dataset;
                }
              }
            }());
          }
        }
        return el.__sprigDataAccessor__;
      };

  // --- UTILS
  function hasComponent(el) {
    return $D(el).get().sprigComponent
  }

  function isLoading(el) {
    return $D(el).get().sprigReadyState == 'loading'
  }

  function isLoaded(el) {
    return $D(el).get().sprigReadyState == 'loaded'
  }

  function isDeferred(el) {
    return $D(el).get().sprigDefer
  }

  Sprig = (function () {

    function Sprig() {
      this.components = {};
      this.pending = {};

      if (MutationObserver) {
        var self = this;
        var observer = new MutationObserver(function (mutations) {
          for (var i = 0, i_len = mutations.length; i < i_len; i++) {
            (function (addedNodes) {
              for (var j = 0; j < addedNodes.length; j++) {
                var $el = $(addedNodes[j]);
                if (!hasComponent($el) || isLoaded($el) || isLoading($el) || isDeferred($el)) return;
                log("Mutated, now setup: ", addedNodes[j])
                self.setup(addedNodes[j])
              }
            }(mutations[i].addedNodes));
          }
        });
        observer.observe(document, { childList: true, subtree: true });
      }
    }

    Sprig.prototype.finalize = function (el) {
      $D(el).set("sprigReadyState", "loaded");
      this.load(el);
    };

    Sprig.prototype.add = function (componentId, setupFunc) {
      if (this.components[componentId]) {
        return console.warn('Component "' + componentId + '" already registered. Skipping.');
      }

      this.components[componentId] = {
        instances:[],
        setupFunc:setupFunc
      };

      if (this.pending[componentId]) {
        var todo = this.pending[componentId].slice();
        delete this.pending[componentId];
        var el;
        while (el = todo.shift()) {
          log("Now ready to setup " + componentId + " for ", el);
          this.setup(el);
        }
      }
    };

    // Setup a component for a single element
    Sprig.prototype.setup = function (el) {

      var componentId = $D(el).get().sprigComponent;

      var component = this.components[componentId];
      if (!component) {
        // defer initialization until component is added
        log('Component "' + componentId + '" not registered yet, so defer setup for', el);
        this.pending[componentId] || (this.pending[componentId] = []);
        this.pending[componentId].push(el);
        return
      }

      log("Setup component for", el);
      $D(el).set("sprigReadyState", "loading");

      var instance = null;

      for (var i = 0, len = component.instances.length; i < len; i++) {
        if (component.instances[i].el == el) {
          instance = component.instances[i];
          break;
        }
      }

      if (instance) {
        // We are reloading, reset attributes
        log("reloading, original attrs:", JSON.stringify(instance.originalAttrs))
        $.extend($D(el).get(), instance.originalAttrs);
        log($D(el).get())
      }
      else {
        instance = {
          el:el,
          originalAttrs:$.extend({}, $(el).data())
        };
        component.instances.push(instance);
      }

      var setupFunc = component.setupFunc;

      var async = setupFunc.length == 3;

      var data = $D(el).get();

      var self = this;
      if (async) {
        setupFunc(el, data, function () {
          self.finalize(el);
        });
      }
      else {
        setupFunc(el, data);
        self.finalize(el);
      }
    };

    // Look for elements that is not already loaded, or currently loading
    Sprig.prototype.load = function (root) {
      var $notLoaded = $("[data-sprig-component]:not([data-sprig-ready-state=loaded]):not([data-sprig-ready-state=loading])", root);
      log("Load " + $notLoaded.length + " components in", root || 'body');
      var self = this;
      $notLoaded.each(function (i, el) {
        self.setup(el);
      });
    };

    // Look for elements that is already loaded, and reload them
    Sprig.prototype.reload = function (root) {
      log("Load component inside", root);
      var $loaded = $("[data-sprig-ready-state=loaded]", root);
      log("Reload " + $loaded.length + " components in", root || 'body');
      var self = this;
      $loaded.each(function (i, el) {
        self.setup(el);
      });
    };

    var global = new Sprig();
    $.extend(Sprig, global);

    return Sprig;

  })();

  // Setup mutation observers

  if (typeof exports !== 'undefined') {
    // Export as CommonJS module...    
    module.exports = Sprig;
  }
  else {
    // ... or add to to the global object as Sprig
    global.Sprig = Sprig;
  }
}