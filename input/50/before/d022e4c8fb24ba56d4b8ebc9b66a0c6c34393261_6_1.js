function TimelineEvent(eventType) {
	this.type = eventType;
	this.attributes = {};
	this.time = new Date().getTime();
}