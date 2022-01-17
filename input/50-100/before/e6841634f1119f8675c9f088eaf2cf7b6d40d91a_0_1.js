function (e) {
            that.isMouseover = (e.offsetX > 10 || e.toElement != div);
            if (that.isMouseover) {
                e.cancelBubble = true;
                if (e.preventDefault) e.preventDefault();
                if (e.stopPropagation) e.stopPropagation();
                that.map_.closeTooltip();
            }
        }