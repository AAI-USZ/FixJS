function(cat, type) {
        var defaultDesc, defaultTitle, defaultValue;
        defaultValue = null;
        defaultDesc = _this.MarkersConfig[cat]["marker_types"][type]["data_translation"][window.LANG]["desc"];
        defaultTitle = _this.MarkersConfig[cat]["marker_types"][type]["data_translation"][window.LANG]["title"] || _this.MarkersConfig[cat]["marker_types"][type]["data_translation"][window.LANG]["name"];
        if (((defaultDesc != null) || defaultTitle === "") && (defaultTitle != null)) {
          defaultValue = $.extend(true, {}, _this.MarkersConfig[cat]["marker_types"][type]["data_translation"]);
        }
        return defaultValue;
      }