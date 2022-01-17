function(name, target, before, after, context) {
	this.id = JSSpec.Example.id++;
	this.name = name;
	this.target = target;
	this.before = before;
	this.after = after;
	this.context = context;
}