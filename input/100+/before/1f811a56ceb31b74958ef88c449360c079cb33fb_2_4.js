function(e,isDown)
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
        this.frame_ = CONSTANTS.MAX_FRAME + 1;
        this.End();
    }
    if(this.WasKeyPressed(KEYS.EIGHT,keyCode,isDown))
        this.SpeedUp();
    if(this.WasKeyPressed(KEYS.NINE,keyCode,isDown))
        this.SlowDown();

    this.keyboardState_["_" + keyCode] = isDown;
    if(!!this.managed_)
        this.managed_.OnKeyStateChanged(isDown,keyCode,this.frame_);
}