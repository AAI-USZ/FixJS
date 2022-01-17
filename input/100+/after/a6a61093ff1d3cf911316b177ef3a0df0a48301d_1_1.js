function Sprite(imageBase, imageSets, hasGravity, isPlatform) {
        this.imageBase = imageBase;
        this.imageSets = imageSets;
        this.hasGravity = hasGravity;
        this.isPlatform = isPlatform;

        // default to the mode and state "s"
        if (typeof(this.mode) === "undefined")
            this.mode = "s";
        if (typeof(this.state) === "undefined")
            this.state = "s";
        this.dir = "r";
        this.frame = 0;

        // useless default location and size
        this.x = 0;
        this.y = 0;
        this.xioff = 0;
        this.yioff = 0;
        try {
            this.w = imageSets["s"].width;
            this.h = imageSets["s"].height;
        } catch (ex) {
            this.w = 0;
            this.h = 0;
        }

        // useless default speed and acceleration
        this.xvel = 0;
        this.xacc = false; // false means "stop"
        this.xaccmax = false; // the maximum velocity we can get to by acceleration
        this.yvel = 0;
        this.yacc = false; // less meaningful here
        this.yaccmax = false;

        // what elements are left of us?
        this.leftOf = null

        // what elements are right of us?
        this.rightOf = null;

        // what elements are above us?
        this.above = null;

        // what elements are we standing on?
        this.on = null;
    
        // what elements are we clipping through?
        this.thru = {};

        // load all the images
        if (typeof(this.images) === "undefined") {
            var images = this.images = {};
            for (var state in imageSets) {
                var imgSet = imageSets[state];
                for (var dir in {"r":0,"l":0}) {
                    for (var i = 0; i < imgSet.frames; i++) {
                        if ("frameAliases" in imgSet && imgSet.frameAliases[i] != i) continue;
                        var img = new Image();
                        if (imageBase.match(/\/\//)) {
                            img.src = imageBase + state + i + dir + ".png";
                        } else {
                            img.src = wpConf.imageBase + imageBase + state + i + dir + ".png";
                        }
                        images[state + i + dir] = img;
                    }
                }
            }
        }

        // create the img element that is the actual display of the sprite
        this.el = document.createElement("img");
        this.el.wpSprite = this;

        this.el.src = this.getImage(this.state, "r", 0);

        this.el.style.color = "black";
        this.el.style.position = "absolute";
        this.el.style.zIndex = "1000000";
        this.el.style.fontSize = "20px";
        document.body.appendChild(this.el);

        // if it's a sprite platform, we want a faster getClientRects than the builtin one
        if (isPlatform) {
            this.el.getClientRects = function() {
                var scrollTop = document.documentElement.scrollTop ||
                    document.body.scrollTop;
                var scrollLeft = document.documentElement.scrollLeft ||
                    document.body.scrollLeft;

                return [{
                    left: this.wpSprite.x - scrollLeft,
                    top: this.wpSprite.y - scrollTop,
                    right: this.wpSprite.x + this.wpSprite.w - scrollLeft,
                    bottom: this.wpSprite.y + this.wpSprite.h - scrollTop
                }];
            }
        }

        this.setXY(0, 0);
    }