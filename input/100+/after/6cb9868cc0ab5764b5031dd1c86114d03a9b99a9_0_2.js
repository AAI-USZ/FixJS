function(e) {
		var data = musu.appContext.feed.query("type='truth_dare_state'");
		var start_obj_DbObj = new SocialKit.DbObj(data[0]);
		var temp_dare = start_obj_DbObj.query("type='dare'"); //get all dares (array of json truths)
		
		if (temp_dare.length != context.feed.members.length)
		{
			alert("Still waiting on " + (context.feed.members.length - temp_dare.length) + " member(s) to answer!");
			return;
		}
		
		if(temp_dare.length > 0) //if dare submitted - default
		{
			var arr = new Array(); //array of open dares
			for(i = 0; i < temp_dare.length; i++) 
			{
				var dare_DbObj = new SocialKit.DbObj(temp_dare[i]); //need to make temp dbObj to query for answers
				var nested = dare_DbObj.query("type='taken'");
				if(nested.length == 0)
				{
					arr.push(temp_dare[i]); //store json for populating answer page
				}
			}
			var current_dare = new SocialKit.DbObj(arr[rand]); //making dbobj for nesting answered under dare 
			var taken_obj = new SocialKit.Obj({type: "taken", json: {}}); //make taken obj to nest under answer
			current_dare.post(taken_obj); //post under dare
			
			var user = new SocialKit.DbObj(getUser(context)); //get user to put answer under it 
			var answer_json = {"screen_type" : "dare", "text" : arr[rand].json['text'], "dare_src": arr[rand].json['src_user']}; //make answer json
			var answer_obj = new SocialKit.Obj({type: "progress", json : answer_json}); //make answer obj
			user.post(answer_obj); //put under user
			
			$(".dare_page").css("display","inline");
		    $(".choice").css("display","none"); //display dare_page for answering
		 }
	}