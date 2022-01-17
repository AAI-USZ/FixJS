function(e) {
      var style = "font-size:30px;padding:5px;";
      style += "background-color:blue;white-space:nowrap;";
      style += "color:red;";
      var text = "game started!";
      var html = '<span style="' + style + '">' + text + '</span>';
      var content = { "__html" : html, "text" : text };
      var start_obj = new SocialKit.Obj({type : "truth_dare_state", json: content}); //global
      musu.appContext.feed.post(start_obj);
      
      var userID = context.user['id'];
      console.log("userID = " + userID);
  
      console.log("context.user[name] = " + context.user['name']);
      var user_json = {"id" : userID, "name" : context.user['name']};
      user_obj = new SocialKit.Obj({type: "user", json: user_json});
      console.log((user_obj));
      var data = musu.appContext.feed.query("type='truth_dare_state'", "_id desc limit 1")[0];
      start_obj_DbObj = new SocialKit.DbObj(data); 
      
      start_obj_DbObj.post(user_obj);
      var test_user_obj = start_obj_DbObj.query("type='user'");
      console.log("test_user_obj.length = " + test_user_obj.length);
      //musu.appContext.quit();
      
    }