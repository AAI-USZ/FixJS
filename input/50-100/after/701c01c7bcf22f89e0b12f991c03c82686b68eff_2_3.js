function(e) {
          _this.isMouseover = e.offsetX > 10 || e.toElement !== div;
          if (_this.isMouseover) {
            e.cancelBubble = true;
            if (typeof e.preventDefault === "function") e.preventDefault();
            if (typeof e.stopPropagation === "function") e.stopPropagation();
            return _this.map.closeTooltip();
          }
        }