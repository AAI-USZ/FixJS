function(thisValue)
{
    return function()
    {
        thisValue.RunGameLoop();
    }
}