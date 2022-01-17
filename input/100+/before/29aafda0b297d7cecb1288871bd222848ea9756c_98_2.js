function(element, scrollBox, alignmentX, alignmentY, scrollWhenVisible)
{
    if (!element)
        return;

    if (!scrollBox)
        scrollBox = Dom.getOverflowParent(element);

    if (!scrollBox)
        return;

    var offset = Dom.getClientOffset(element);

    if (!alignmentX)
        alignmentX = "centerOrLeft";

    if (!alignmentY)
        alignmentY = "centerOrTop";

    if (alignmentY)
    {
        var topSpace = offset.y - scrollBox.scrollTop;
        var bottomSpace = (scrollBox.scrollTop + scrollBox.clientHeight) -
            (offset.y + element.offsetHeight);

        // Element is vertically not completely visible or scrolling is enforced
        if (topSpace < 0 || bottomSpace < 0 || scrollWhenVisible)
        {
            switch (alignmentY)
            {
                case "top":
                    scrollBox.scrollTop = offset.y;
                    break;

                case "center":
                case "centerOrTop":
                    var elementFitsIntoScrollBox = element.offsetHeight <= scrollBox.clientHeight;
                    var y = elementFitsIntoScrollBox || alignmentY != "centerOrTop" ?
                        offset.y - (scrollBox.clientHeight - element.offsetHeight) / 2 :
                        offset.y;
                    scrollBox.scrollTop = y;
                    break;

                case "bottom":
                    var y = offset.y + element.offsetHeight - scrollBox.clientHeight;
                    scrollBox.scrollTop = y;
                    break;
            }
        }
    }

    if (alignmentX)
    {
        var leftSpace = offset.x - scrollBox.scrollLeft;
        var rightSpace = (scrollBox.scrollLeft + scrollBox.clientWidth) -
            (offset.x + element.clientWidth);

        // Element is horizontally not completely visible or scrolling is enforced
        if (leftSpace < 0 || rightSpace < 0 || scrollWhenVisible)
        {
            switch (alignmentY)
            {
                case "left":
                    scrollBox.scrollLeft = offset.x;
                    break;

                case "center":
                case "centerOrLeft":
                    var elementFitsIntoScrollBox = element.offsetWidth <= scrollBox.clientWidth;
                    var x = elementFitsIntoScrollBox || alignmentX != "centerOrLeft" ?
                        offset.x - (scrollBox.clientWidth - element.offsetWidth) / 2 :
                        offset.x;
                    scrollBox.scrollLeft = y;
                    break;

                case "right":
                    var x = offset.x + element.offsetWidth - scrollBox.clientWidth;
                    scrollBox.scrollLeft = x;
                    break;
            }
        }
    }

    if (FBTrace.DBG_PANELS)
        FBTrace.sysout("dom.scrollTo", element.innerHTML);
}