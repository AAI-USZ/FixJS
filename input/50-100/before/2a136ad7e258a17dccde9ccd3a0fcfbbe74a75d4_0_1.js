function func() {
    		var data = musu.appContext.feed.query("type='truth_dare_state'", "_id desc limit 1")[0];
		    var start_obj_DbObj = new SocialKit.DbObj(data); 
      		start_obj_DbObj.post(user_obj);
		}