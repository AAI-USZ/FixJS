function(e) {
      var style = "font-size:30px;padding:5px;";
      style += "background-color:blue;white-space:nowrap;";
      style += "color:red;";
      var text = "game started!";
      var html = '<span style="' + style + '">' + text + '</span>';
      var content = { "__html" : html, "text" : text };
      var start_obj = new SocialKit.Obj({type : "truth_dare_state", json: content}); //global
      musu.appContext.feed.post(start_obj);
      
	  
	  var user_obj = makeUser(context);
	  console.log("=============USER IS: " + user_obj);
	       
      setTimeout(func, 100);
      var test_user_obj;
		function func() {
    		var data = musu.appContext.feed.query("type='truth_dare_state'", "_id desc limit 1")[0];
		    var start_obj_DbObj = new SocialKit.DbObj(data); 
      		start_obj_DbObj.post(user_obj);
		}
      //musu.appContext.quit();
      
    }