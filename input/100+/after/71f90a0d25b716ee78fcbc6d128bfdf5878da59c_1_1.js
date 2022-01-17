function nextNote(){
    ID = currentSite.attr("id");
    var currentNote = Notes[ID][currentNoteIndex];
    if(currentNote){
        var contWindow = $(".currentSite")[0].contentWindow
        $(contWindow).scrollTop(currentNote.scroll_y);
        removeHighlight($(contWindow.document.body));
        console.log(currentNote.content);
        doHighlight(contWindow.document,"highlight",currentNote.content);
        $(contWindow.document.body).find(".highlight").css("background-color","yellow");
        console.log(currentNoteIndex);
        if (currentNoteIndex < (Object.keys(Notes).length-1)){
            currentNoteIndex += 1;
        }
    }
}