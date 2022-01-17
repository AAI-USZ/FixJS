function updateNoteDisplay(data){
    previousNoteID = data.id;
    moveNoteToPrevious(data.content);
    deleteNoteButton.attr("disabled","");
}