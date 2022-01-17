function(player,animation,disintegrationAnimation, xOffset, yOffset, xSpeed, ySpeed, xFunc, yFunc, attackState, hitState, baseDamage, energyToAdd)
{
    var energyToAdd_ = energyToAdd || 0;
    var Projectile = function()
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
    Projectile.prototype.SetEnergyToAdd = function(value) { energyToAdd_ = value; }
    Projectile.prototype.GetVxFunc = function() { return this.VxFn; }
    Projectile.prototype.SetVxFunc = function(value) { this.VxFn = value; }
    Projectile.prototype.GetVyFunc = function() { return this.VyFn; }
    Projectile.prototype.SetVyFunc = function(value) { this.VyFn = value; }
    Projectile.prototype.Count = 0;
    /*Stops the projectile*/
    Projectile.prototype.Cancel = function(ignoreOnGoneEvent)
    {
        this.element_.style.display="none";
        this.x_ = this.offsetX_;
        this.y_ = this.offsetY_;
        this.t_ = 0;
        this.isActive_ = false;
        this.isDisintegrating_ = false;
        if(!ignoreOnGoneEvent)
            this.owner_.onProjectileGoneFn_(this.id_);
    }

    Projectile.prototype.Release = function()
    {
        utils_.RemoveFromDOM(this.element_);
    }

    /*Fires the projectile*/
    Projectile.prototype.Throw = function(frame,stageX,stageY)
    {
        if(!!this.isDisintegrating_)
            this.Cancel();
        this.startFrame_ = frame;
        this.t_ = 0;
        this.element_.style.display="none";
        this.direction_ = this.owner_.direction_;
        this.x_ += this.owner_.GetX();
        this.y_ += this.owner_.GetY();
        this.stageX_ = stageX;
        this.stageY_ = stageY;
        this.isActive_ = true;
        this.isDisintegrating_ = false;
        this.VxFn = (this.animation_.GetXModifier());
        this.VyFn = (this.animation_.GetYModifier());
        this.nbHits_ = 0;
        this.lastHitFrame_ = 0;
    }

    Projectile.prototype.GetTop = function()
    {
        return parseInt(this.element_.style.bottom) + parseInt(this.element_.style.height) - this.trimY_;
    }

    Projectile.prototype.GetBottom = function()
    {
        return parseInt(this.element_.style.bottom) + this.trimY_;
    }

    Projectile.prototype.GetBackX = function()
    {
        if(this.direction_ < 0)
            return parseInt(this.element_.style.left) + (this.trimX_);
        else
            return STAGE.MAX_STAGEX - (parseInt(this.element_.style.right) + (this.trimX_));
    }

    Projectile.prototype.GetFrontX = function()
    {
        if(this.direction_  < 0)
            return (parseInt(this.element_.style.width) + parseInt(this.element_.style.left)) - this.trimX_;
        else
            return (STAGE.MAX_STAGEX - (parseInt(this.element_.style.right) + parseInt(this.element_.style.width) - this.trimX_));
    }
    Projectile.prototype.GetLeftX = function() { if(this.direction_ > 0){return STAGE.MAX_STAGEX - this.x_ + parseInt(this.element_.style.width);}else{return this.x_;}}
    Projectile.prototype.GetRightX = function() { if(this.direction_ > 0){return STAGE.MAX_STAGEX - this.x_;}else{return this.x_ + parseInt(this.element_.style.width);}}
    Projectile.prototype.GetMidX = function()
    {
        var left = this.GetBackX();
        var right = this.GetFrontX();

        return right - ((right-left)/2);
    }
    Projectile.prototype.GetMidY = function()
    {
        var bottom = this.GetBottom();
        var top = this.GetTop();

        return top - ((top-bottom)/2);
    }

    /*Is the projectile active?*/
    Projectile.prototype.IsActive = function()
    {
        if(this.IsDisintegrating())
            return false;
        return this.isActive_;
    }

    /*Is the projectile active?*/
    Projectile.prototype.IsDisintegrating = function()
    {
        return this.isDisintegrating_;
    }

    /*Is the projectile still visible?*/
    Projectile.prototype.IsVisible = function(stageX,stageY)
    {
        return (this.x_ < STAGE.MAX_STAGEX && this.x_ > -100) && (this.y_ > 0 && this.y_ < 1000);
    }


    Projectile.prototype.CanHit = function(frame)
    {
        return !this.isDisintegrating_ && ((!this.lastHitFrame_) || (frame > (this.lastHitFrame_ + this.hitStopFrameCount_)));
    }

    Projectile.prototype.IsInHitStop = function(frame)
    {
        return ((!!this.lastHitFrame_) && (frame < (this.lastHitFrame_ + this.hitStopFrameCount_)));
    }

    /*Advances the projectile*/
    Projectile.prototype.Advance = function(frame,stageX,stageY)
    {
        /*Is the projectile still on screen?*/
        if(!this.IsVisible(0,0))
        {
            this.Cancel();
            return null;
        }
        this.element_.style.display = "none";
        ++this.t_;
        this.isActive_ = true;



        if(!this.IsInHitStop(frame))
        {
            if(!this.isDisintegrating_)
            {
                var xSpeed = this.VxFn(this.xSpeed_,this.t_);
                var ySpeed = this.VyFn(this.ySpeed_,this.t_);

                var dx = (xSpeed) + (this.direction_ > 0 ? (this.stageX_ - stageX) : (stageX - this.stageX_));
                var dy = (ySpeed) + (this.stageY_ - stageY);


                this.x_ += dx;
                this.y_ += dy;
            }

        }
        if(!!this.isDisintegrating_)
        {
            this.x_ += this.direction_ > 0 ? (this.stageX_ - stageX) : (stageX - this.stageX_);
            this.y_ += this.stageY_ - stageY;
        }




        var offsetX = 0;
        var offsetY = 0;

        var delta = frame - this.startFrame_;
        var newFrame = null;
        if(!this.isDisintegrating_)
        {
            newFrame = this.animation_.GetFrame(delta);
            if(!newFrame)
            {
                newFrame = this.animation_.BaseAnimation.frames_[0];
                this.startFrame_ = frame;
            }
        }
        else
        {
            newFrame = this.disintegrationAnimation_.GetFrame(delta);
            if(!newFrame)
            {
                this.Cancel();
                return null;
            }
        }

        this.SetSprite(newFrame,offsetX,offsetY,stageX,stageY);
        this.stageX_ = stageX;
        this.stageY_ = stageY;

        /*Allow players on the other team to deal with projectile coming toward them.*/
        this.owner_.OnProjectileMoved(this.id_,this.GetMidX(),this.GetMidY());

        return this;
    }


    /*sets and moves the image - for browsers that load preloaded images instantly when the src property is set*/
    Projectile.prototype.SetSprite = function(newFrame,offsetX,offsetY,stageX,stageY)
    {
        if(!!newFrame)
        {
            offsetX = newFrame.X;
            offsetY = newFrame.Y;

            if(this.direction_ > 0)
            {
                var data = spriteLookup_.Get(newFrame.RightSrc)
                if(!!data && (this.element_.style.backgroundPositionX != data.Left))
                {
                    this.element_.style.width = data.Width;
                    this.element_.style.height = data.Height;
                    this.element_.style.backgroundPosition = data.Left + " " + data.Bottom;
                }

            }
            else
            {

                var data = spriteLookup_.Get(newFrame.LeftSrc)
                if(!!data && (this.element_.style.backgroundPositionX != data.Left))
                {
                    this.element_.style.width = data.Width;
                    this.element_.style.height = data.Height;
                    this.element_.style.backgroundPosition = data.Left + " " + data.Bottom;
                }

            }
        }

        if(this.isDisintegrating_)
        {
            if(this.direction_ > 0)
            {
                this.element_.style.left = (offsetX + FlipCoord(this.x_,parseInt(this.element_.style.width))) + "px";
                this.element_.style.right = "";
            }
            else
            {
                this.element_.style.right = (offsetX + FlipCoord(this.x_,parseInt(this.element_.style.width))) + "px";
                this.element_.style.left = "";
            }
        }
        else
        {
            if(this.direction_ > 0)
            {
                this.element_.style.left = "";
                this.element_.style.right = (offsetX + this.x_) + "px";
            }
            else
            {
                this.element_.style.right = "";
                this.element_.style.left = (offsetX + this.x_) + "px";
            }
        }
        var imgOffsetY = this.y_ - (parseInt(this.element_.style.height)/2);
        this.element_.style.bottom = imgOffsetY + "px";
        if(this.element_.style.display != "")
            this.element_.style.display="";
    }


    Projectile.prototype.Disintegrate = function(frame)
    {
        this.isDisintegrating_ = true;
        this.startFrame_ = frame;
    }
    /*The projectile has hit a player*/
    Projectile.prototype.HitPlayer = function(frame)
    {
        this.lastHitFrame_ = frame;
        if(++this.nbHits_ >= this.maxHits_)
            this.Disintegrate(frame);
    }
    /*The projectile has hit another projectile*/
    Projectile.prototype.HitProjectile = function(frame,otherProjectile)
    {
        var isSuper = !!(this.flagsToSend_ & ATTACK_FLAGS.SUPER);
        var isOtherSuper = !!(otherProjectile.flagsToSend_ & ATTACK_FLAGS.SUPER);
        var areBothSupers = isSuper && isOtherSuper;

        if(!isSuper || areBothSupers)
            this.Disintegrate(frame);
        if(!isOtherSuper || areBothSupers)
            otherProjectile.Disintegrate(frame);
    }
    return new Projectile();
}