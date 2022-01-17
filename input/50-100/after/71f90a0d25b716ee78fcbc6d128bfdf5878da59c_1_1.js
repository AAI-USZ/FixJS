function (i,siteID){
        var currentFrame = $('<iframe />');
        currentFrame.attr('id', siteID);
        currentFrame.addClass('siteDisplay')
        currentFrame.addClass("notCurrent");
        siteDisplayDiv.append(currentFrame);
        loadIframes(siteID);
    if(i == 0){
        currentFrame.load(function(){
            $(this).removeClass("notCurrent").addClass("currentSite")
        });
        currentSite = currentFrame;
    }
}