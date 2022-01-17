function($, $$, undef) {



if(!window.bbit) bbit = {};

if(!bbit.solr) bbit.solr = {};



var LiveSearch = {},

	FOCUS_RESULT_CLASS = "focussed",

	UPDATING_RESULT_CLASS = "updating";



LiveSearch.Implements = [ Options, Events, Class.Occlude ];

LiveSearch.Binds = [ "onKeyUp", "onFocus", "onBlur", "onSubmit", "onClick", "onChange", "search", "setResult" ];

LiveSearch.options = {

	delay: 100,

	disableFormSubmit: true,

};

LiveSearch.initialize = function(input, target, targetModule, options) {

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

};

LiveSearch.activate = function() {

	var self = this;

	if(!self.valid) return;

	

	self.input.addEvent("keyup", self.onKeyUp);

	self.input.addEvent("focus", self.onFocus);

	self.input.addEvent("blur", self.onBlur);



	self.holder.addEvent("click:relay(.pagination a)", self.onClick);

	

	if(self.form) {

		self.form.addEvent("change", self.onChange);

		if(self.options.disableFormSubmit) self.form.addEvent("submit", self.onSubmit);

	}

	

	self.fetchInput();

	self.holder.removeClass(FOCUS_RESULT_CLASS);

};

LiveSearch.deactivate = function() {

	var self = this;

	if(!self.valid) return;

	

	clearTimeout(self.keyIdleTimer);



	self.input.removeEvent("keyup", self.onKeyUp);

	self.input.removeEvent("focus", self.onFocus);

	self.input.removeEvent("blur", self.onBlur);

	

	self.holder.removeEvent("click:relay(.pagination a)", self.onClick);

	

	if(self.form) {

		self.form.removeEvent("change", self.onChange);

		self.form.removeEvent("submit", self.onSubmit);

	}

	

	self.holder.removeClass(FOCUS_RESULT_CLASS);

};

LiveSearch.onSubmit = function(event) {

	event.preventDefault();

};

LiveSearch.onKeyUp = function() {

	var self = this;

	clearTimeout(self.keyIdleTimer);

	self.keyIdleTimer = setTimeout(self.search, self.options.delay);

};

LiveSearch.onFocus = function() {

	var self = this;

	clearTimeout(self.focusTimer);

	clearTimeout(self.keyIdleTimer);

	self.focus = true;

	self.holder.addClass(FOCUS_RESULT_CLASS);

	self.search();

};

LiveSearch.onBlur = function() {

	var self = this;

	clearTimeout(self.focusTimer);

	clearTimeout(self.keyIdleTimer);

	self.focus = undef;

	self.focusTimer = self.holder.removeClass.delay(150, self.holder, FOCUS_RESULT_CLASS);

	self.search();

};

LiveSearch.onClick = function(event, relay) {

	var self = this, url = relay.get("href");

	clearTimeout(self.keyIdleTimer);

	event.preventDefault();

	self.search(new URI(url).get("data"));

};

LiveSearch.onChange = function() {

	var self = this;

	clearTimeout(self.keyIdleTimer);

	self.search();

};

LiveSearch.getInputValue = function() {

	return this.input.get("value").clean().toLowerCase();

};

LiveSearch.search = function(query) {

	var self = this, options = {};

	if(!query) query = self.fetchInput();

	if(!self.isNew(query)) return;

	

	options.data = query;

	self.request.send(options);

};

LiveSearch.fetchInput = function() {

	var self = this,

		form = self.form || self.input,

		query = form.toQueryString().parseQueryString();

	query.q = self.getInputValue();

	query.t = self.targetModule;

	query.l = 1;

	return query;

};

LiveSearch.isNew = function(query) {

	var self = this, qs = Object.toQueryString(query);

	

	if(qs == self.qs) return undef;



	self.query = query;

	self.qs = qs;

	return true;

};

LiveSearch.setResult = function(html) {

	var self = this;

	self.holder.set("html", html);

	self.holderQuery = self.request.options.data;

};



bbit.solr.LiveSearch = new Class(LiveSearch);



}