function (data) {
			console.log(data);
			$("#winner").append("<img class='userImg' src='"+data.url+"'>");
		}