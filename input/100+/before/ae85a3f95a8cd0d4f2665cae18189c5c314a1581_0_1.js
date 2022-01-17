function() {
    $.extend({
      yaMaps: {
        maps: {},
        _mapTools: ['default'],
        _init: [],
        _layouts: {},
        addMapTools: function(button) {
          this._mapTools.push(button);
        },
        getMapTools: function(Map) {
          var tools = [];
          for (var i in this._mapTools) {
            if (typeof this._mapTools[i] == 'function') {
              tools.push(this._mapTools[i](Map));
            }
            else {
              tools.push(this._mapTools[i]);
            }
          }
          return tools;
        },
        addInit: function(func) {
          this._init.push(func);
        },
        initPlugins: function() {
          for (var i in this._init) {
            this._init[i]();
          }
        },
        addLayout: function(name, layout) {
          this._layouts[name] = layout;
        },
        initLayouts: function() {
          for (var name in this._layouts) {
            ymaps.layout.storage.add(name, this._layouts[name]);
          }
        }
      }
    });
  }