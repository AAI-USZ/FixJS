function(that, container) {
          var configureInstance, onReady, options, thatFn;
          onReady = [];
          thatFn = function() {
            return that;
          };
          that.presentation = {};
          that.facet = {};
          that.component = {};
          that.dataStore = {};
          that.dataView = {};
          that.controller = {};
          options = that.options;
          configureInstance = function() {
            var cName, cconfig, config, fName, fconfig, pName, pconfig, storeName, viewConfig, viewName, _i, _len, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _results;
            if ((options != null ? options.dataStores : void 0) != null) {
              _ref3 = options.dataStores;
              for (storeName in _ref3) {
                config = _ref3[storeName];
                that.addDataStore(storeName, config);
              }
            }
            if ((options != null ? options.dataViews : void 0) != null) {
              _ref4 = options.dataViews;
              for (viewName in _ref4) {
                viewConfig = _ref4[viewName];
                that.addDataView(viewName, viewConfig);
              }
            }
            if ((options != null ? options.controllers : void 0) != null) {
              _ref5 = options.controllers;
              for (cName in _ref5) {
                cconfig = _ref5[cName];
                that.addController(cName, cconfig);
              }
            }
            if ((options != null ? options.facets : void 0) != null) {
              _ref6 = options.facets;
              for (fName in _ref6) {
                fconfig = _ref6[fName];
                that.addFacet(fName, fconfig);
              }
            }
            if ((options != null ? options.components : void 0) != null) {
              _ref7 = options.components;
              for (cName in _ref7) {
                cconfig = _ref7[cName];
                that.addComponent(cName, cconfig);
              }
            }
            if ((options != null ? options.presentations : void 0) != null) {
              _ref8 = options.presentations;
              for (pName in _ref8) {
                pconfig = _ref8[pName];
                that.addPresentation(pName, pconfig);
              }
            }
            if ((options != null ? options.plugins : void 0) != null) {
              _ref9 = options.plugins;
              _results = [];
              for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
                pconfig = _ref9[_i];
                _results.push(that.addPlugin(pconfig));
              }
              return _results;
            }
          };
          that.ready = function(fn) {
            return onReady.push(fn);
          };
          that.addDataStore = function(storeName, config) {
            var prop, propOptions, store, type, typeInfo, _ref3, _ref4, _results;
            if (!(that.dataStore[storeName] != null)) {
              store = MITHGrid.Data.Store.initInstance();
              that.dataStore[storeName] = store;
              store.addType('Item');
              store.addProperty('label', {
                valueType: 'text'
              });
              store.addProperty('type', {
                valueType: 'text'
              });
              store.addProperty('id', {
                valueType: 'text'
              });
            } else {
              store = that.dataStore[storeName];
            }
            if ((config != null ? config.types : void 0) != null) {
              _ref3 = config.types;
              for (type in _ref3) {
                typeInfo = _ref3[type];
                store.addType(type);
              }
            }
            if ((config != null ? config.properties : void 0) != null) {
              _ref4 = config.properties;
              _results = [];
              for (prop in _ref4) {
                propOptions = _ref4[prop];
                _results.push(store.addProperty(prop, propOptions));
              }
              return _results;
            }
          };
          that.addDataView = function(viewName, viewConfig) {
            var initFn, k, v, view, viewOptions;
            if ((viewConfig.type != null) && (viewConfig.type.initInstance != null)) {
              initFn = viewConfig.type.initInstance;
            } else {
              initFn = MITHGrid.Data.View.initInstance;
            }
            viewOptions = {
              dataStore: that.dataStore[viewConfig.dataStore] || that.dataView[viewConfig.dataStore]
            };
            if (!(that.dataView[viewName] != null)) {
              for (k in viewConfig) {
                v = viewConfig[k];
                if (k !== "type" && !viewOptions[k]) viewOptions[k] = v;
              }
              view = initFn(viewOptions);
              return that.dataView[viewName] = view;
            }
          };
          that.addController = function(cName, cconfig) {
            var controller, coptions;
            coptions = $.extend(true, {}, cconfig);
            coptions.application = thatFn;
            controller = cconfig.type.initInstance(coptions);
            return that.controller[cName] = controller;
          };
          that.addFacet = function(fName, fconfig) {
            var foptions;
            foptions = $.extend(true, {}, fconfig);
            return that.ready(function() {
              var facet, fcontainer;
              fcontainer = $(container).find(fconfig.container);
              if ($.isArray(fcontainer)) fcontainer = fcontainer[0];
              foptions.dataView = that.dataView[fconfig.dataView];
              foptions.application = thatFn;
              facet = fconfig.type.initInstance(fcontainer, foptions);
              that.facet[fName] = facet;
              return facet.selfRender();
            });
          };
          that.addComponent = function(cName, pconfig) {
            var coptions;
            coptions = $.extend(true, {}, cconfig);
            return that.ready(function() {
              var ccName, cconfig, ccontainer, ccoptions, _ref3, _ref4;
              ccontainer = $(container).find(coptions.container);
              if ($.isArray(ccontainer)) ccontainer = ccontainer[0];
              coptions.application = thatFn;
              if (cconfig.components != null) {
                coptions.components = {};
                _ref3 = cconfig.components;
                for (ccName in _ref3) {
                  cconfig = _ref3[ccName];
                  if (typeof cconfig === "string") {
                    coptions.components[ccName] = that.component[ccName];
                  } else {
                    ccoptions = $.extend(true, {}, ccconfig);
                    ccoptions.application = thatFn;
                    coptions.components[ccName] = cconfig.type.initInstance(ccoptions);
                  }
                }
              }
              if (cconfig.controllers != null) {
                coptions.controllers = {};
                _ref4 = pconfig.controllers;
                for (ccName in _ref4) {
                  cconfig = _ref4[ccName];
                  if (typeof cconfig === "string") {
                    coptions.controllers[ccName] = that.controller[ccName];
                  } else {
                    ccoptions = $.extend(true, {}, ccconfig);
                    ccoptions.application = thatFn;
                    coptions.controllers[ccName] = cconfig.type.initInstance(ccoptions);
                  }
                }
              }
              return that.component[cName] = cconfig.type.initInstance(ccontainer, coptions);
            });
          };
          that.addPresentation = function(pName, pconfig) {
            var poptions;
            poptions = $.extend(true, {}, pconfig);
            return that.ready(function() {
              var cName, ccName, cconfig, ccoptions, coptions, pcontainer, presentation, _ref3, _ref4;
              pcontainer = $(container).find(poptions.container);
              if ($.isArray(pcontainer)) pcontainer = pcontainer[0];
              poptions.dataView = that.dataView[pconfig.dataView];
              poptions.application = thatFn;
              if (pconfig.components != null) {
                poptions.components = {};
                _ref3 = pconfig.components;
                for (ccName in _ref3) {
                  cconfig = _ref3[ccName];
                  if (typeof cconfig === "string") {
                    poptions.components[ccName] = that.component[ccName];
                  } else {
                    ccoptions = $.extend(true, {}, ccconfig);
                    ccoptions.application = thatFn;
                    poptions.components[ccName] = cconfig.type.initInstance(ccoptions);
                  }
                }
              }
              if (pconfig.controllers != null) {
                poptions.controllers = {};
                _ref4 = pconfig.controllers;
                for (cName in _ref4) {
                  cconfig = _ref4[cName];
                  if (typeof cconfig === "string") {
                    poptions.controllers[cName] = that.controller[cName];
                  } else {
                    coptions = $.extend(true, {}, cconfig);
                    coptions.application = thatFn;
                    poptions.controllers[cName] = cconfig.type.initInstance(coptions);
                  }
                }
              }
              presentation = pconfig.type.initInstance(pcontainer, poptions);
              that.presentation[pName] = presentation;
              return presentation.selfRender();
            });
          };
          that.addPlugin = function(pconf) {
            var pconfig, plugin, pname, prconfig, prop, propOptions, type, typeInfo, _ref3, _ref4, _ref5, _results;
            pconfig = $.extend(true, {}, pconf);
            pconfig.application = thatFn;
            plugin = pconfig.type.initInstance(pconfig);
            if (plugin != null) {
              if ((pconfig != null ? pconfig.dataView : void 0) != null) {
                plugin.dataView = that.dataView[pconfig.dataView];
                _ref3 = plugin.getTypes();
                for (type in _ref3) {
                  typeInfo = _ref3[type];
                  plugin.dataView.addType(type);
                }
                _ref4 = plugin.getProperties();
                for (prop in _ref4) {
                  propOptions = _ref4[prop];
                  plugin.dataView.addProperty(prop, propOptions);
                }
              }
              _ref5 = plugin.getPresentations();
              _results = [];
              for (pname in _ref5) {
                prconfig = _ref5[pname];
                _results.push(function(pname, prconfig) {
                  return that.ready(function() {
                    var pcontainer, presentation, proptions;
                    proptions = $.extend(true, {}, prconfig.options);
                    pcontainer = $(container).find(prconfig.container);
                    if ($.isArray(pcontainer)) pcontainer = pcontainer[0];
                    if ((prconfig != null ? prconfig.lenses : void 0) != null) {
                      proptions.lenses = prconfig.lenses;
                    }
                    if (prconfig.dataView != null) {
                      proptions.dataView = that.dataView[prconfig.dataView];
                    } else if (pconfig.dataView != null) {
                      proptions.dataView = that.dataView[pconfig.dataView];
                    }
                    proptions.application = thatFn;
                    presentation = prconfig.type.initInstance(pcontainer, proptions);
                    plugin.presentation[pname] = presentation;
                    return presentation.selfRender();
                  });
                });
              }
              return _results;
            }
          };
          configureInstance();
          return that.run = function() {
            return $(document).ready(function() {
              var fn, _i, _len;
              for (_i = 0, _len = onReady.length; _i < _len; _i++) {
                fn = onReady[_i];
                fn();
              }
              onReady = [];
              return that.ready = function(fn) {
                return fn();
              };
            });
          };
        }