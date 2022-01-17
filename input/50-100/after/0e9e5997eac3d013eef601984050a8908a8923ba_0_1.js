function togglebinary(toggleNum, toggleVal, savetoggles)
{
    // Toggle num should be between 1 and 52 - see definition of toggleBinaryGlobal above.
    if ((toggleNum >=1) && (toggleNum <= 52))
    {
        //alert("togglebinary tbg:" + toggleBinaryGlobal);
        
        // Safe to use.
        var start = toggleBinaryGlobal.substring(0,toggleNum);
        var end = toggleBinaryGlobal.substring(toggleNum+1);
        //var newval = start + toggleVal + end;
        toggleBinaryGlobal = start + toggleVal + end;
        
        //toggleBinaryGlobal = newval;

        //alert("togglebinary toggleNum:" + toggleNum + " st:" + start + " ed:" + end + " tv:" + toggleVal + " tbg:" + toggleBinaryGlobal);

        if (savetoggles == true) 
        {
            save_toggles();
        }
    }
}