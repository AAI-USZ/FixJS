function initialNavigation(containerSelector,specialComponentSelector,backgroundPath,buttonLeftSelector,buttonRightSelector,radGroupName)
{
    $(containerSelector).prepend('\
    <div style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;"> \
        <div id="couldBG" style="position:absolute;left:-200px;width:150%;height:100%;background-image:url(\''+ backgroundPath + '\')"></div> \
    </div> \
    <div style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;"> \
        <div  style="width:966px;margin:auto;overflow:hidden;height:350px;top:0px;position:relative;">\
            <div id="testNav"  style="left:0px;position:relative;"></div>\
        </div>\
    </div> ');
    $(buttonLeftSelector).click(clickLeft);
    $(buttonRightSelector).click(clickRight);
    radSelector = 'input[name='+ radGroupName + ']:radio';
    $(radSelector).click(radClick);
    
    $(specialComponentSelector).each(function(i,e)
    {
        $(e).appendTo("#testNav");
        $(e).addClass("testNavDiv");
        $(e).css("top","0px");
        $(e).css("position","absolute");
        $(e).css("width",966+"px");
        $(e).css("left", i * 966 + "px");
        count++;
    });
}