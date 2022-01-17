function(user, title, body, category){
	this.user = user;
	this.body = body;
	this.category = category;
	this.status = 'unanswered';
	this.title = title;
	this.followup = [];
}