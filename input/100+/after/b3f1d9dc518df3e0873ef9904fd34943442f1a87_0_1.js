function () {
		console.log("Time to load images")
		$("#status").text("Click on an image to vote for it!");
		$.get("/games/"+$.cookie("gameId")+"/getImages", function (data) {
			console.log(data);
			for (i in data) {
				var url = data[i]["url"];
				var author = data[i]["submittedBy"];
				$("#images").append("<img class='userImg' id='userImg-"+author+"' src='"+url+"'/>")
			}
			$(".userImg").click(function () {
				console.log('gonna cast a vote');
				var myId = this.id;
				var votee = myId.substring(8);
				console.log('vote for: ', votee);
				castVote(votee);
				$("#images").remove();
				$("#status").text("Thanks for your vote! Wait a bit for the final results...")
				
			});
			setTimeout(displayWinner,10000);
		});
	}