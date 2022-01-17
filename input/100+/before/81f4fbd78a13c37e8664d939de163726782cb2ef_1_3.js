function(e) {
        var element;
        element = e.target || e.srcElement;
        globals.groupIndex = Number(element.value);
        globals.groupSelection = data.getUnique(globals.groupIndex);
        return _this.init();
      }