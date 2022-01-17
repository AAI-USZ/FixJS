function()
{
    var user1_ = null;
    var user2_ = null;
    var frame_ = 0;
    var keyboardState_ = {};
    var keyState_ = 0;
    var keyStates_ = [];
    var lastTime_ = 0;
    var speed_ = CONSTANTS.NORMAL_SPEED;
    var targetFPS_ = CONSTANTS.TARGET_FPS;
    var extraSpeed_ = 0;
    var fontSystem_ = CreateFontSystem();
    var text_ = fontSystem_.AddText("pnlText");
    var useAlternateImageLoadingFunctions_ = window.navigator.userAgent.indexOf("Firefox") > -1;
    var state_ = 0;
    var isInitialized_ = false;
    var managed_ = null;
    var nextTimeout_ = 0;
    var match_ = null;

    /*Encapulates a new game*/
    var Game = function ()
    {
        lastTime_ = this.GetCurrentTime();
    }

    Game.prototype.GetMatch = function() { return match_; }

    Game.prototype.IsGameOver = function()
    {
        return frame_ >= CONSTANTS.MAX_FRAME;
    }

    Game.prototype.AddManagedText = function(elementId,x,y,fontPath)
    {
        return fontSystem_.AddText(elementId,"",x,y,0,fontPath);
    }

    Game.prototype.SetSpeed = function(value)
    {
        speed_ = value;
    }

    Game.prototype.GetSpeed = function() { return speed_; }
    Game.prototype.GetCurrentFrame = function () { return frame_; }
    Game.prototype.UseAlternateImageLoadingFunctions = function() { return useAlternateImageLoadingFunctions_; }

    /*Resets the timer*/
    Game.prototype.ResetFrame = function()
    {
        frame_ = 0;
    }
    /*returns the current frame*/
    /*Returns the current time in milliseconds*/
    Game.prototype.GetCurrentTime = function()
    {
        if(!!Date.now)
            return Date.now();
        else
            return (new Date() - new Date(0));
    }
    Game.prototype.HasState = function(flag)
    {
        return (flag & state_) > 0
    }

    Game.prototype.AddState = function(flag)
    {
        state_ |= flag;
    }

    Game.prototype.ToggleState = function(flag)
    {
        state_ ^= flag;
    }

    Game.prototype.RemoveState = function(flag)
    {
        state_ = (state_ | (flag)) ^ (flag);
    }


    Game.prototype.OnStageImagesLoaded = function()
    {
        if(!!match_)
            match_.stage_.Reset();
    }

    Game.prototype.ReleaseText = function()
    {
        fontSystem_.Reset();
        text_ = fontSystem_.AddText("pnlText","");
    }

    Game.prototype.ResetKeys = function()
    {
        keyboardState_ = {};
        if(!!managed_)
            managed_.ResetKeys();
    }

    Game.prototype.Init = function()
    {
        if(!isInitialized_)
        {
            var getKeyPressHandler = function(thisValue,isDown)
            {
                return function(e)
                {
                    thisValue.HandleKeyPress(e,isDown);
                }
            }

            var resetKeys = function(thisValue)
            {
                return function(e)
                {
                    thisValue.ResetKeys();
                }
            }

            if(!!window.document.attachEvent)
            {
                window.document.attachEvent("onkeydown",getKeyPressHandler(this,true),true);
                window.document.attachEvent("onkeyup",getKeyPressHandler(this,false),true);
                /*window.attachEvent("onblur", resetKeys(this), true);*/
                window.onblur = resetKeys(this);
            }
            else
            {
                window.document.addEventListener("keydown",getKeyPressHandler(this,true),true);
                window.document.addEventListener("keyup",getKeyPressHandler(this,false),true);
                /*window.addEventListener("onblur", resetKeys(this), true);*/
                window.onblur = resetKeys(this);
            }
        }
        isInitialized_ = true;

    }

    Game.prototype.PreloadTextImages = function()
    {
        if(!!isInitialized_)
            return;
        fontSystem_.Preload();
    }

    Game.prototype.InitDOM = function()
    {
        window.document.getElementById("pnlTeam1").style.display = "";
        window.document.getElementById("pnlTeam2").style.display = "";
        window.document.getElementById("bg0").style.display = "";
        window.document.getElementById("bg1").style.display = "";
    }

    Game.prototype.ResetDOM = function()
    {
        window.document.getElementById("pnlTeam1").style.display = "none";
        window.document.getElementById("pnlTeam2").style.display = "none";
        window.document.getElementById("bg0").style.display = "none";
        window.document.getElementById("bg1").style.display = "none";
    }

    Game.prototype.StartMatch = function(goodGuys,badGuys, stage)
    {
        this.Break();
        announcer_.Release();
        if(!!match_)
            match_.Release();
        speed_ = CONSTANTS.NORMAL_SPEED;
        var goodGuys = goodGuys;
        var badGuys = badGuys;
        var stage = stage;

        if(!!charSelect_)
        {
            goodGuys = goodGuys || charSelect_.GetGoodGuys();
            badGuys = badGuys || charSelect_.GetBadGuys();
            stage = stage || charSelect_.GetStage();

            charSelect_.Release();
        }

        match_ = new Match();
        announcer_.SetMatch(match_);
        this.Init();
        this.InitDOM();
        this.PreloadTextImages();

        managed_ = match_;

        match_.stage_.Set(stage);
        match_.Start(goodGuys,badGuys);
        isInitialized_ = true;
        frame_ = 0;
        this.RunGameLoop();
    }

    Game.prototype.StartCharSelect = function()
    {
        this.Break();
        announcer_.Release();
        speed_ = CONSTANTS.NORMAL_SPEED;
        if(!!managed_)
            managed_.Release();
        if(!!match_)
            match_.Release();
        this.ResetDOM();
        this.Init();
        this.PreloadTextImages();
        charSelect_ = new CharSelect(user1_,user2_);
        charSelect_.Init(window.document.getElementById("pnlStage"));
        managed_ = charSelect_;
        /*center the screen*/
        Stage.prototype.Center();
        managed_.Resume();
        isInitialized_ = true;
        frame_ = 0;
        this.RunCharSelectLoop();
    }
    /*Increases the game loop speed*/
    Game.prototype.SpeedUp = function()
    {
        if(speed_ > CONSTANTS.MIN_DELAY)
            speed_ -= CONSTANTS.SPEED_INCREMENT;
    }
    /*Decreases the game loop speed*/
    Game.prototype.SlowDown = function()
    {
        if(speed_ < CONSTANTS.MAX_DELAY)
            speed_ += CONSTANTS.SPEED_INCREMENT;
    }
    /*pauses the game*/
    Game.prototype.Pause = function()
    {
        this.AddState(GAME_STATES.PAUSED);
        this.AddState(GAME_STATES.STEP_FRAME);
        window.document.getElementById("spnState").innerHTML = "State: Frame Step"
        window.document.getElementById("spnState").className = "state paused"
        if(!!managed_)
            managed_.Pause();
    }
    /*resumes the game*/
    Game.prototype.Resume = function()
    {
        this.RemoveState(GAME_STATES.PAUSED);
        window.document.getElementById("spnState").innerHTML = "State: Running";
        window.document.getElementById("spnState").className = "state running";
        if(!!managed_)
            managed_.Resume();
    }
    /*Returns true if the key is being released*/
    Game.prototype.WasKeyPressed = function(key,keyCode,isDown)
    {
        return (keyCode == key && !!keyboardState_["_" + key] && !isDown)
    }
    /*Handle game wide key events, or pass the event on to the match*/
    Game.prototype.HandleKeyPress = function(e,isDown)
    {
        var keyCode = e.which || e.keyCode;
        /*Alert(keyCode);*/


        if(this.WasKeyPressed(KEYS.O,keyCode,isDown))
        {
            this.Pause();
        }
        if(this.WasKeyPressed(KEYS.P,keyCode,isDown))
        {
            this.Resume();
        }
        if(this.WasKeyPressed(KEYS.ESCAPE,keyCode,isDown))
        {
            frame_ = CONSTANTS.MAX_FRAME + 1;
            this.End();
        }
        if(this.WasKeyPressed(KEYS.EIGHT,keyCode,isDown))
            this.SpeedUp();
        if(this.WasKeyPressed(KEYS.NINE,keyCode,isDown))
            this.SlowDown();

        keyboardState_["_" + keyCode] = isDown;
        if(!!managed_)
            managed_.OnKeyStateChanged(isDown,keyCode,frame_);
    }

    Game.prototype.End = function()
    {
        this.ReleaseText();
        this.ResetKeys();
        managed_.Kill()
        managed_ = null;
        announcer_.Release();
    }

    Game.prototype.HandleInput = function()
    {
    }

    Game.prototype.AddUser1 = function(right,up,left,down,p1,p2,p3,k1,k2,k3,turn)
    {
        user1_ = new User(right,up,left,down,p1,p2,p3,k1,k2,k3,turn);
        return user1_;
    }
    Game.prototype.AddUser2 = function(right,up,left,down,p1,p2,p3,k1,k2,k3,turn)
    {
        user2_ = new User(right,up,left,down,p1,p2,p3,k1,k2,k3,turn);
        return user2_;
    }

    /*Helper function*/
    Game.prototype.GetGameLoopClosure = function(thisValue)
    {
        return function()
        {
            thisValue.RunGameLoop();
        }
    }

    /*Helper function*/
    Game.prototype.GetCharSelectLoopClosure = function(thisValue)
    {
        return function()
        {
            thisValue.RunCharSelectLoop();
        }
    }

    /*Shows the frame rate on screen*/
    Game.prototype.ShowFPS = function()
    {
        if(frame_ % targetFPS_ == 0)
        {
            var now = this.GetCurrentTime();
            var elapsed = now - lastTime_;
            lastTime_ = now;

            var fps = Math.floor(CONSTANTS.FPS_VALUE / elapsed);
            spnFPS_.innerHTML = fps;
        }
    }

    Game.prototype.Break = function()
    {
        window.clearTimeout(nextTimeout_);
    }

    /*Basic game loop*/
    Game.prototype.RunGameLoop = function()
    {
        this.HandleInput();
        if(!this.HasState(GAME_STATES.PAUSED) || this.HasState(GAME_STATES.STEP_FRAME))
        {
            this.RemoveState(GAME_STATES.STEP_FRAME);
            ++frame_;
            //match_.PreFrameMove(frame_);
            match_.FrameMove(frame_, keyboardState_);
            announcer_.FrameMove(frame_);
            soundManager_.FrameMove(frame_);
            if(!match_.isSuperMoveActive_)
                fontSystem_.FrameMove(frame_);

            match_.Render(frame_);
            if(!match_.isSuperMoveActive_)
                fontSystem_.Render(frame_);
            announcer_.Render(frame_);
            soundManager_.Render(frame_);

            match_.RenderComplete(frame_);
            this.ShowFPS();
        }

        if(!match_.IsMatchOver(frame_))
        {
            //nextTimeout_ = window.requestAnimFrame(runGameLoop_,speed_);
            nextTimeout_ = window.setTimeout(runGameLoop_,speed_);
        }
        else
        {
            match_.HandleMatchOver(frame_);
        }
    }

    Game.prototype.RunCharSelectLoop = function()
    {
        if(!!charSelect_ && charSelect_.delayAfterSelect_ < CONSTANTS.DELAY_AFTER_CHARACTER_SELECT)
        {
            this.HandleInput();
            if(!this.HasState(GAME_STATES.PAUSED) || this.HasState(GAME_STATES.STEP_FRAME))
            {
                this.RemoveState(GAME_STATES.STEP_FRAME);
                ++frame_;
                charSelect_.FrameMove(frame_);
                soundManager_.FrameMove(frame_);

                if(!!charSelect_.isDone_ && charSelect_.delayAfterSelect_ >= CONSTANTS.DELAY_AFTER_CHARACTER_SELECT)
                {
                    managed_ = null;
                    this.StartMatch();
                }
                charSelect_.Render(frame_);
                soundManager_.Render(frame_);
                this.ShowFPS();
            }

            if(!this.IsGameOver())
            {
                //nextTimeout_ = window.requestAnimFrame(runCharSelectLoop_,speed_);
                nextTimeout_ = window.setTimeout(runCharSelectLoop_,speed_);
            }
            else
            {
                Alert("user aborted.");
            }
        }
    }

    return new Game();
}