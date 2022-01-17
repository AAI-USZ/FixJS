function move(e){
        if(draft.activeTool==null)return;
        setXY(e);
        if(draft.down)
            drag(e);
        else 
            if(draft.activeTool.move)
                if(draft.activeTool.move(e))
                    refreshToolLayer();
    }