function() {
        this.element.show();

        this.canvas.addEvent('mousedown', this.events.down);
        window.addEvent('mouseup', this.events.up);
        window.addEvent('mousemove', this.events.move);
        window.addEvent('mousewheel', this.events.zoom);
        window.addEvent('resize', this.events.resize);
        document.body.addClass('noscroll');

        this.keyboard.activate();

        var hash = location.hash.split('#')[1];
        if (typeof hash !== 'undefined') {
            var data = JSON.parse(unescape(hash));
            data.viewer = true;
            location.hash = JSON.stringify(data);
        }

        this.element.setStyle('background-color', Frog.Prefs.backgroundColor);
        
        
        this.fireEvent('onShow', [this]);
        this.isOpen = true;
        this.resize();
    }