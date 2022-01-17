function(target_uuid, user, objectType, title, body){
	//this.id = uuid;
	this.target_uuid = target_uuid;
	this.user = user;
	this.upvote = 0;
	this.downvote = 0;
	this.title = title;
	this.body = body;		
	this.objectType = objectType;
	this.isAnswered = 'false';
}