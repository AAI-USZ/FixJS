function (data) {
		if (data && data.errorcode === 0 && data.questions.length > 0) {
			if (page === 0) {
				questionList.innerHTML = "";
			}
			$.each(data.questions, function (index, item) {
				questionList.innerHTML += "<div class='question'>"
					+ "<h2>" + item._source.title + "</h2>"
					+ "<div>Time: " + new Date(item._source.timestamp).toLocaleString() + "</div>"
					+ "<div>AskedBy: " + item._source.user + "</div>"
					+ "<p>" + item._source.body  + "</p>"
					+ "</div>";
			});
		} else {
			questionList.innerHTML = "failure";
		}
	}