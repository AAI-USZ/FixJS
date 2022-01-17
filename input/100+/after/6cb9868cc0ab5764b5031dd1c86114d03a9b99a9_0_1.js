function(e) { //if clicked truth on choice
		var data = musu.appContext.feed.query("type='truth_dare_state'");
		var start_obj_DbObj = new SocialKit.DbObj(data[0]);
		var temp_truth = start_obj_DbObj.query("type='truth'"); //get all truths (array of json truths)
		
		if (temp_truth.length != context.feed.members.length)
		{
			alert("Still waiting on " + (context.feed.members.length - temp_truth.length) + " member(s) to answer!");
			return;
		}
		
		if(temp_truth.length > 0) //if truth submitted - default
		{
			var arr = new Array(); //array of open truths
			for(i = 0; i < temp_truth.length; i++) 
			{
				var truth_DbObj = new SocialKit.DbObj(temp_truth[i]); //need to make temp dbObj to query for answers
				var nested = truth_DbObj.query("type='taken'");
				if(nested.length == 0)
				{
					arr.push(temp_truth[i]); //store json for populating answer page
				}
			}
			var rand = Math.floor(Math.random() * (arr.length)); //rand index
			var truth_json = (new SocialKit.Obj(arr[rand])).json; //random truth json from obj json rep (meta-JSON) 
			$("#current_truth").append(truth_json['text'] + " asked by: " + truth_json['src_user']); //fill answer-div with rand truth and user
			
			var current_truth = new SocialKit.DbObj(arr[rand]); //making dbobj for nesting answered under truth 
			var taken_obj = new SocialKit.Obj({type: "taken", json: {}}); //make taken obj to nest under answer
			current_truth.post(taken_obj); //post under truth
			
			var user = new SocialKit.DbObj(getUser(context)); //get user to put answer under it 
			var answer_json = {"screen_type" : "truth", "text" : arr[rand].json['text'], "truth_src": arr[rand].json['src_user']}; //make answer json
			var answer_obj = new SocialKit.Obj({type: "progress", json : answer_json}); //make answer obj
			user.post(answer_obj); //put under user
			
			$(".truth_page").css("display","inline");
		    $(".choice").css("display","none"); //display truth_page for answering
		}
	}