function updateNoteDisplay(data){
    if (data.id == "none") {
        moveNoteToPrevious("No more notes on this page.  Go ahead and take a few.");
        deleteNoteButton.attr("disabled","disabled");
    }else{
        previousNoteID = data.id;
        moveNoteToPrevious(data.content);
        deleteNoteButton.attr("disabled","");
    }
}