function nextSite(){
    currentSite.addClass("notCurrent").removeClass("currentSite");
    currentSiteID = siteIDs[currentSiteIndex+1];
    currentSite = $("#"+String(currentSiteID));
    currentSite.removeClass("notCurrent").addClass("currentSite");
    if (currentSiteIndex < siteIDs.length-1){
        currentSiteIndex+=1;
        currentNoteIndex = 0;
        console.log(currentNoteIndex);
    }
}