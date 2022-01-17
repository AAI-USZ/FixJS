function(uuid, user, title, body, category, timestamp){
	this.id = uuid;
	this.user = user;
	this.body = body;
	this.category = category;
	this.status = 'unanswered';
	this.title = title;
	this.timestamp = timestamp;
	this.followup = [];
}