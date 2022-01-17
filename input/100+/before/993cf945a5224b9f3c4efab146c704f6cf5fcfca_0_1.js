function(input, target, targetModule, options) {

	var self = this, addUpdating, removeUpdating;

	

	self.input = input = $(input);

	if(!input) return;

	if(input.get("tag") != "input") return;

	if(input.get("type") != "text") return;

	

	if(self.occlude("bbit.solr.LiveSearch", self.input)) return self.occluded;



	target = $(target);

	if(!target) return;

	self.holder = new Element("div").wraps(target);

	

	if(!targetModule.toInt) return;

	self.targetModule = targetModule.toInt();

	if(self.targetModule < 1) return;

	

	self.valid = true;

	self.setOptions(options);

	self.form = input.getParent("form");

	self.block = input.getParent(".block");

	addUpdating = self.holder.addClass.pass(UPDATING_RESULT_CLASS, self.holder);

	removeUpdating = self.holder.removeClass.pass(UPDATING_RESULT_CLASS, self.holder);

	self.request = new Request({

		url: window.location.href,

		method: "get",

//		timeout: 1500,

		link: "cancel",

		onRequest: addUpdating,

		onTimeout: removeUpdating,

		onComplete: removeUpdating,

		onCancel: removeUpdating,

		onException: removeUpdating,

		onSuccess: self.setResult

	});

}