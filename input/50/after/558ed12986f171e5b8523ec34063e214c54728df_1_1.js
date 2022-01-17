function(results) {

	results[0].set("like", results[0].get("like")++);
	results[0].save();

}