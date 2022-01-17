function nextNote(){
    var currentNote = Notes[currentSiteIndex][currentNoteIndex];
    var contWindow = $(".currentSite")[0].contentWindow
    $(contWindow).scrollTop(currentNote.scroll_y);
    $(contWindow.document.body).removeHighlight();
    console.log(currentNote.content);
    doHighlight(contWindow.document,"highlight",currentNote.content);
    $(contWindow.document.body).find(".highlight").css("background-color","yellow");
    if (currentNoteIndex < (Object.keys(Notes).length-1)){
        currentNoteIndex += 1;
    }
}