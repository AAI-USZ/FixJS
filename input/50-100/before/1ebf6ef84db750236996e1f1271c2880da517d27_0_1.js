function up(e){
        if(TRACE_UI)console.log("up");
        draft.down = false;

        if(draft.activeTool==null)return;
        if(draft.activeTool.up==null) return;
        setXY(e);
        if(draft.activeTool.up(e))
            refreshFG();
    }