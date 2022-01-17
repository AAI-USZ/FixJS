function TimelineEvent(eventType, attrs) {
	this.type = eventType;
	this.attributes = attrs;
	this.time = +(new Date);
}