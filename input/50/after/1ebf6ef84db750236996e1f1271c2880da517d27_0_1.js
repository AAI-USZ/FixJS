function drag(e){
        if(TRACE_UI)console.log("drag");
        if(draft.activeTool.drag==null) return;
        if(draft.activeTool.drag(e))
            refreshToolLayer(); 
    }