function(x, y)
	{
        var sol = this.objtype.getCurrentSol(); 
        var select_all_save = sol.select_all;
        sol.select_all = true;
        var overlap_cnt = this.runtime.testAndSelectCanvasPointOverlap(this.objtype, x, y, false);
        if (overlap_cnt == 0)
        {
            // recover to select_all_save
            sol.select_all = select_all_save;        
            return false;
        }
        
        // overlap_cnt > 0
        // 0. find out index of behavior instance
        if (this.behavior_index == null )
            this.behavior_index = this.objtype.getBehaviorIndexByName(this.name);
            
            
        // 1. get all valid behavior instances            
        var ovl_insts = sol.getObjects();
        var i, cnt;
        var inst;            
        cnt = ovl_insts.length;   
        this._behavior_insts.length = 0;          
        for (i=0; i<cnt; i++ )
        {
            inst = ovl_insts[i].behavior_insts[this.behavior_index];
            if (inst.activated)
                this._behavior_insts.push(inst);
        }
            
        // 2. get the max z-order inst
        cnt = this._behavior_insts.length;
		
		if (cnt == 0)  // no inst match
		{
            // recover to select_all_save
            sol.select_all = select_all_save;
            return false;  // get drag inst 
		}
		
        var target_inst = this._behavior_insts[0];
        for (i=1; i<cnt; i++ )
        {
            inst = this._behavior_insts[i];
            if ( inst.inst.zindex > target_inst.inst.zindex )
                target_inst = inst;
        }
        target_inst.drag_info.is_on_drag = true;
        var inst_x = target_inst.inst.x;
        var inst_y = target_inst.inst.y;
        target_inst.drag_info.drag_dx = inst_x - x;
        target_inst.drag_info.drag_dy = inst_y - y;
        this.runtime.trigger(cr.behaviors.Rex_DragDrop2.prototype.cnds.OnDragStart, target_inst.inst);     

        // recover to select_all_save
        sol.select_all = select_all_save;
        this._behavior_insts.length = 0; 
        
        return true;  // get drag inst  
	}