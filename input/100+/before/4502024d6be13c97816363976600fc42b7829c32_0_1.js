function()
{
    var output = "";
    var tmp = "";
    for(var i = 0, length = this.keyStates_.length; i < length; ++i)
    {
        tmp = "";
        var bit = this.keyStates_[i].Bit;
        var keys = ((((((((this.keyStates_[i].Bit | 1) ^ 1) | 2) ^ 2) | 4) ^ 4) | 8) ^ 8);
        var dir = ((((((((((((this.keyStates_[i].Bit | 16) ^ 16) | 32) ^ 32) | 64) ^ 64) | 128) ^ 128) | 256) ^ 256) | 512) ^ 512);
        
        tmp += this.DebugShowDirsHelper(dir);
        tmp += this.DebugShowKeysHelper(keys);

        if(!!tmp)
        {
            if(tmp[0] == "+")
                tmp = tmp.substring(1);
            if(!!output)
                output += ", ";
            output += tmp;
        }
    }

    if(!!output)
    {
        this.debKeysElement_.innerHTML = output;
    }
}