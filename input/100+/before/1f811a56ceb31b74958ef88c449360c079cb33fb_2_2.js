function()
{
    if(!this.isInitialized_)
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
    this.isInitialized_ = true;

}