function() {
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
          }