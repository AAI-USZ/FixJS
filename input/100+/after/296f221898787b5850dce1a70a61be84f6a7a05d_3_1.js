function(core, file) {
        this._super(core);
        var that = this;
        this.enemy = this.addEnemy();
        this.player = this.addPlayer();
        this.foreground = new OverlayState(core);
        this.foreground.uiFrame = new Entity({ x: 0, y: 0, image: 'frame.png' });
        this.foreground.add(this.foreground.uiFrame);
        
        var functions = {
            // Global functions
            LoadGraphic: function(file) {
                that.enemy.setImage(file);
            },

            SetLife: function(life) {
                that.enemy.life = life;
            },

            GetX: function() {
                return that.enemy.x;
            },

            GetY: function() {
                return that.enemy.y;
            },

            CreateShot01: function(x, y, speed, angle, image, timeout) {
                if (!that.enemy.alive) {
                    return;
                }
                setTimeout(function() {
                    that.add(new Bullet({
                        x: x, y: y, speed: speed, 
                        angle: angle + 180, image: image,
                        owner: that.enemy, life: 10000
                    }));
                }, timeout);
            }
        };

        this.danmakufu = Danmakufu.loadFile(file, functions);

        this.danmakufu.execute(function(script) {
            that.main = new script.script_enemy_main();
            that.script = script;
            that.main.Initialize();
            that.initialized = true;
            that.comments = that.script.__comments__;
        });
    }