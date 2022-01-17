function(o)
{
    try {
        return o && o instanceof window.Range;
    }
    catch (ex) {
        return false;
    }
}