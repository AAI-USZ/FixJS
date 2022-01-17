function(e) {
		var temp_truth = start_obj_DbObj.query("type='truth'");
		if(temp_truth.length > 0)
		{
			var arr = new Array();
			for(i = 0; i < temp_truth.length; i++) 
			{
				var truth_DbObj = new SocialKit.DbObj(temp_truth[i]); //need to make temp dbObj to query for answers
				var nested = truth_DbObj.query("type='answer'");
				if(nested.length ==0)
				{
					arr.push(new SocialKit.Obj(temp_truth[i])); //need Obj to extract json next
				}
			}
			var rand = Math.floor(Math.random()* (arr.length));
			console.log("arr.length = " + arr.length);
			console.log("arr["+rand+"] = " + arr[rand]);
			console.log("arr["+rand+"].json.text = " + arr[rand].json['text']);
			$("#current_truth").append(arr[rand].json['text'] + " asked by: " + arr[rand].json['name']);
		}
	}