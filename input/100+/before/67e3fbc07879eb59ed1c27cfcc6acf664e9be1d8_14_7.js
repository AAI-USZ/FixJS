function()
    {
        this.owner_ = player;
        this.animation_ = animation;
        this.disintegrationAnimation_ = disintegrationAnimation;
        this.offsetX_ = xOffset;
        this.offsetY_ = yOffset;
        this.initialX_ = xOffset;
        this.initialY_ = yOffset;
        this.x_ = xOffset;
        this.y_ = yOffset;
        this.xSpeed_ = xSpeed || 1;
        this.ySpeed_ = ySpeed || 0;
        this.xFunc_ = xFunc || function(y){return this.xSpeed_ * 3;}
        this.yFunc_ = yFunc || function(x){return this.ySpeed_ * 1;}
        this.direction_ = player.direction_;
        this.startFrame_ = 0;
        this.element_ = window.document.createElement("div");
        this.element_.className="projectile";
        this.element_.style.display="none";
        this.element_.style.backgroundImage = "url(images/misc/" + player.folder_.toLowerCase() + "/projectiles.png)";
        window.document.getElementById("pnlStage").appendChild(this.element_);
        this.isActive_ = false;
        this.attackState_ = attackState || 0;
        this.hitState_ = hitState || 0;
        this.baseDamage_ = baseDamage || 0;
        this.flagsToSend_ = MISC_FLAGS.NONE;
        this.isDisintegrating_ = false;
        this.t_ = 0;
        this.VxFn = null;
        this.VyFn = null;
        this.nbHits_ = 0;
        this.maxHits_ = 1;
        this.hitStopFrameCount_ = CONSTANTS.DEFAULT_PROJECTILE_HIT_STOP_FRAME_COUNT;
        this.lastHitFrame_ = 0;
        this.fx_ = 1;
        this.fy_ = 1;
        this.id_ = "" + Projectile.prototype.Count;
        this.canJuggle_ = false;
        this.trimX_ = 20;
        this.trimY_ = 70;
        ++Projectile.prototype.Count;
    }