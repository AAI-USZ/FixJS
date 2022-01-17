function() {
        MM.addEvent(map.parent, 'mousemove', onMove);
        MM.addEvent(map.parent, 'mousedown', onDown);
        MM.addEvent(map.parent, 'mouseup', onUp);
        tt = document.createElement('div');
        tt.className = 'map-latlngtooltip';
        return this;
    }