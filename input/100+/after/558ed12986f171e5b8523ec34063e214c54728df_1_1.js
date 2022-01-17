function like(RequestID){

var Request = Parse.Object.extend("Request");
var query = new Parse.Query(Request);
query.equalTo(RequestID);
query.find({
success: function(results) {

	results[0].set("like", results[0].get("like")++);
	results[0].save();

},
error: function(error) {
alert("Error: " + error.code + " " + error.message);
}
});
}