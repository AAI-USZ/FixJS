function(e) {
          that.isMouseover = e.offsetX > 10 || e.toElement !== div;
          if (that.isMouseover) {
            e.cancelBubble = true;
            if (typeof e.preventDefault === "function") e.preventDefault();
            if (typeof e.stopPropagation === "function") e.stopPropagation();
            return that.map.closeTooltip();
          }
        }