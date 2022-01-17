function nextNote(){
    var currentNote = Notes[currentSiteIndex][currentNoteIndex];
    console.log(currentNote);
    console.log(currentNote.scroll_y);
    console.log($(".currentSite")[0]);
    $($(".currentSite")[0].contentWindow).scrollTop(currentNote.scroll_y);
    if (currentNoteIndex < (Object.keys(Notes).length-1)){
        currentNoteIndex += 1;
    }
}