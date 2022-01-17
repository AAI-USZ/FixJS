function(core, background, foreground) {
        var that = this;
        this._super(core, background, foreground);
        this.add(new Player({
            x: that.gameArea.width / 2, 
            y: 100,
            image: 'characters/marisa.png',
            scale: 2
        }))
        this.foreground = new OverlayState(core);
        this.foreground.frame = new Entity({ x: 0, y: 0, image: 'frame.png' });
        this.foreground.add(this.foreground.frame);
    }