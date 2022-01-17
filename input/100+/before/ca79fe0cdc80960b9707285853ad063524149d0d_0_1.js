function getUser(context)
    {
      var data = context.feed.query("type='truth_dare_state'", "_id desc limit 1")[0];
	  var start_obj_DbObj = new SocialKit.DbObj(data); 
	  var user_arr = start_obj_DbObj.query("type = 'user'");
	  console.log("================================USER IN GETUSER IS = " + JSON.stringify(user_arr));
	  for(i =0; i < user_arr.length; i++) {
	  	temp_user = new SocialKit.Obj(user_arr[i]);
	  	temp_ID = temp_user.id;
	  	if(temp_ID == context.user['id']) {
	  		return temp_user;
	  	}
	  }
	  return null;
    }