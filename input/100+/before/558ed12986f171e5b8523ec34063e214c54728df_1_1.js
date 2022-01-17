function like(like){
	
alert("like");

var Request = Parse.Object.extend("Request");
var query = new Parse.Query(Request);
query.equalTo(RequestID);
query.find({
success: function(results) {

var Like = results[0].get("like") ++;

},
error: function(error) {
alert("Error: " + error.code + " " + error.message);
}
});
}