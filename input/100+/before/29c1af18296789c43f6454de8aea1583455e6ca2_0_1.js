function() {
    var diamondDogConf = {
        dogs: ["dda.", "ddb.", "ddc."],
        moveSpeed: 3,
        pointsPerKill: 500,
        edgeDetectDist: 5,
        edgeDetectSize: 10 /* hopAbove*2 */
    }

    var diamondDogImageSets = {
        s: {
            frames: 3,
            frameRate: 3,
            width: 63,
            height: 34,
            bb: [15, 50, 12, 17]
        },
        r: {
            frames: 6,
            frameRate: 3,
            width: 63,
            height: 34,
            bb: [15, 50, 12, 17]
        },
        da: {
            frames: 1,
            frameRate: 3,
            width: 63,
            height: 34,
            bb: [15, 50, 12, 17]
        },
        db: {
            frames: 1,
            frameRate: 3,
            width: 63,
            height: 34,
            bb: [15, 50, 12, 17]
        },
        dc: {
            frames: 1,
            frameRate: 3,
            width: 63,
            height: 34,
            bb: [15, 50, 12, 17]
        },
        dd: {
            frames: 1,
            frameRate: 3,
            width: 63,
            height: 34,
            bb: [15, 50, 12, 17]
        },
    }

    function DiamondDog() {
        this.mode = this.state = "r";
        WebSplat.Sprite.call(this,
            diamondDogConf.dogs[WebSplat.getRandomInt(0, diamondDogConf.dogs.length)],
            diamondDogImageSets, true, true);
        this.munching = false;
        this.xacc = 0;
        this.updateImage();
    }
    DiamondDog.prototype = new WebSplat.SpriteChild();
    DiamondDog.prototype.isBaddy = true;

    // don't collide with goodies
    DiamondDog.prototype.collision = function(els, xs, ys) {
        if (els === null) return els;
        var rels = [];
        for (var i = 0; i < els.length; i++) {
            if ("wpSprite" in els[i] && els[i].wpSprite.isGoody) {
                this.thru[els[i].wpID] = true;
            } else {
                rels.push(els[i]);
            }
        }
        if (rels.length === 0) return null;
        return rels;
    }

    // every tick, change the acceleration inexplicably
    DiamondDog.prototype.tick = function() {
        if (!this.onScreen()) return;

        if (this.dead) {
            // whoops!
            if (this.state == "da") {
                this.state = "db";
                this.frame = 0;
            } else if (this.state == "db") {
                this.state = "dc";
                this.frame = 0;
            } else if (this.state = "dc") {
                this.state = "dd";
                this.frame = 0;
            }
            this.updateImage();
            return;
        }

        // do a normal round
        WebSplat.Sprite.prototype.tick.call(this);

        // only do anything if we're on a platform
        if (!this.munching && this.on !== null) {
            // if we bumped into something left or there is nothing to the left ...
            if (this.leftOf !== null || this.noPlatform(this.x-diamondDogConf.edgeDetectDist-diamondDogConf.edgeDetectSize)) {
                this.xacc = 1;
                this.xaccmax = diamondDogConf.moveSpeed;
            } else if (this.rightOf !== null || this.noPlatform(this.x+this.w+diamondDogConf.edgeDetectDist)) {
                this.xacc = -1;
                this.xaccmax = -diamondDogConf.moveSpeed;
            } else if (this.xacc === false || this.xacc == 0) {
                this.xacc = 1;
                this.xaccmax = diamondDogConf.moveSpeed;
            }
        } else {
            this.xacc = false;
        }

        if (this.y<0) {
            // don't let them go above the screen
            this.setXY(this.x, 0);
        }
    }

    // is their no platform at this X?
    DiamondDog.prototype.noPlatform = function(x) {
        var els = WebSplat.getElementsByBoxThru(this, this.thru, false, x, diamondDogConf.edgeDetectSize, this.y+this.h, diamondDogConf.edgeDetectSize);
        if (els === null) return true;
        return false;
    }

    // take damage
    DiamondDog.prototype.takeDamage = function(from, pts) {
        // make it dead
        this.dead = true;
        this.mode = "d";
        this.state = "da";
        this.frame = 0;
        this.updateImage();

        // points for the player
        if ("getPoints" in from) {
            from.getPoints(diamondDogConf.pointsPerKill);
        }

        // then remove it
        var spthis = this;
        WebSplat.deplatformSprite(spthis);
        setTimeout(function() {
            WebSplat.remSprite(spthis);
            spthis.el.style.display = "none";
        }, 5000);
    }

    // by default, stick some diamond dog in the game
    WebSplat.addHandler("postload", function() {
        var minY = 240;
        var maxY = WebSplat.conf.maxY-minY;
        // create some diamond dogs!
        var sdc = Math.ceil((WebSplat.conf.maxX*maxY)/(640*480));
        for (var i = 0; i < sdc; i++) {
            var b = new DiamondDog();
            b.setXY(Math.random()*WebSplat.conf.maxX, Math.random()*maxY+minY);
            b.startingPosition();
            WebSplat.addSprite(b);
        }
    });
}