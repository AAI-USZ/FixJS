function dragStart(e) {
            start = [e.pageX, e.pageY];
            whenDragStart(start);
            handler.mouseover(dragDisable).mouseout(dragDisable).click(clickDisable);
        }