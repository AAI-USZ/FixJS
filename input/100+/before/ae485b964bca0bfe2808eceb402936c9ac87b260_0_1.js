function populateSingleOffer(offerNode) {
	var expirationDate = new Date(0);
	expirationDate.setUTCSeconds(offerNode.find("expires").text());
	
	offersListComp.append('<li><a href="offerDetails.html?id=' + offerNode.attr("id") + '">' +
			'<img src="pics/' + offerNode.find("image").text() + '"/>' +
			'<h4>' + offerNode.find("title").text() + '</h4>' +
			'<p>' + offerNode.find("location").text() + '</p>' +
			'<span class="ui-li-count">' + $.format.date(expirationDate, "dd MMMM") + '</span></a></li>');
	offersListComp.listview('refresh');
}