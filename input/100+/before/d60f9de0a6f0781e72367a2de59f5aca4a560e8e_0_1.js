function(e) {
      var truth_text = $("#truth").val();
      var html = '<span>' + truth_text + '</span>';
      var truth_content = { "__html" : html, "text" : truth_text };
      var truth_obj = new SocialKit.Obj({type : "truth", json: truth_content});
      
      var dare_text = $("#dare").val();
      html = '<span>' + dare_text + '</span>';
      var dare_content = { "__html" : html, "text" : dare_text };
      var dare_obj = new SocialKit.Obj({type : "dare", json: dare_content});
      
      var start_obj_DbObj = musu.appContext.query("type='note'");
      console.log(start_obj_DbObj);
      //musu.appContext.feed.post(truth_obj);
      //musu.appContext.feed.post(dare_obj);

      //start_obj.post(truth_obj);
      //start_obj.post(dare_obj);
      
      musu.appContext.quit();  
      console.log("start_obj looks like this after quit:"+ start_obj );
	}