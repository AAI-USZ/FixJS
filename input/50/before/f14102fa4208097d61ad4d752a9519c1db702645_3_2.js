function(list,record,target,index,evt,options) {
        console.log("editNoteCommand");
        this.fireEvent("editNoteCommand",this,record);
    }