function(core, file) {
        this._super(core);
        var that = this;
        this.addPlayer();
        this.foreground = new OverlayState(core);
        this.foreground.uiFrame = new Entity({ x: 0, y: 0, image: 'frame.png' });
        this.foreground.add(this.foreground.uiFrame);
        this.danmakufu = Danmakufu.loadFile(file);
        this.danmakufu.execute(function(script) {
            that.main = new script.script_enemy_main();
            that.script = script;
            that.main.Initialize();
            that.initialized = true;
        });
    }