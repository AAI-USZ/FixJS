function func() {
    		var data = musu.appContext.feed.query("type='truth_dare_state'", "_id desc limit 1")[0];
		    start_obj_DbObj = new SocialKit.DbObj(data); 
		    console.log("=======================start_obj_Dbobj before posting is: " + start_obj_DbObj);
		    start_obj_DbObj.post(user_obj);
		    console.log("========================================== posted");
		}