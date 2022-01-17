function (chess_objs, tile_objs, moving_points, cost, group_name)	
	{        
	    var chess_uid = _get_uid(chess_objs);
	    var tile_uid = _get_uid(tile_objs);
	    if ((chess_uid == null) || (tile_uid == null) || (moving_points<=0))
	        return;

        this.exp_ChessUID = chess_uid;
	    var path_tiles_uids = this.get_moving_path(chess_uid,tile_uid,moving_points, cost);
        if (path_tiles_uids != null)
	        this.group.GetGroup(group_name).SetByUIDList(path_tiles_uids);	    		      	       
	}