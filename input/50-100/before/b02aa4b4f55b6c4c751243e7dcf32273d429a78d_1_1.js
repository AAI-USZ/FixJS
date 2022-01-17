function(uuid, user, title, body){
	this.id = uuid;
	this.user = user;
	this.upvote = 0;
	this.downvote = 0;
	this.title = title;
	this.body = body;	
	this.target_uuid = '';
	this.objectType = '';
	this.timestamp	= '2012-07-01';
	this.isAnswered = 'false';
}