function(target)
    {
        var row = Dom.getAncestorByClass(target, "cssRule");
        var mediaQueryBox = Dom.getChildByClass(row, "cssMediaQuery");
        Firebug.Editor.startEditing(mediaQueryBox);
    }