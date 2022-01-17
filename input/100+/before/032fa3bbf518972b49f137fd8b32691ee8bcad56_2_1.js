function($) {

"use strict";

if (Echo.Utils.isComponentDefined("Echo.StreamServer.Controls.Submit")) return;

var submit = Echo.Control.skeleton("Echo.StreamServer.Controls.Submit");

submit.config = {
	"targetURL": document.location.href,
	"submissionProxyURL": "apps.echoenabled.com/v2/esp/activity/",
	"markers": [],
	"source": {},
	"tags": [],
	"requestMethod": "GET",
	"data": {},
	"itemURIPattern": undefined,
	"actionString": "Type your comment here...",
	"postingTimeout": 30,
	"targetQuery": undefined
};

submit.labels = {
	"createdBy": "Created by",
	"markers": "Markers:",
	"markersHint": "Marker1, marker2, marker3, ...",
	"on": "on",
	"post": "Post",
	"posting": "Posting...",
	"postingFailed": "There was a server error while trying to submit your item. Please try again in a few minutes. <b>Error: \"{error}\"</b>.",
	"postingTimeout": "There was a network issue while trying to submit your item. Please try again in a few minutes.",
	"tagsHint": "Tag1, tag2, tag3, ...",
	"tags": "Tags:",
	"update": "Update",
	"updating": "Updating...",
	"yourName": "Your Name (required)",
	"yourWebsiteOptional": "Your website (optional)"
};

submit.events = {
	"internal.User.onInvalidate": function() {
		this.rerender();
	}
};

// templates

submit.templates.main =
	'<div class="{class:container}">' +
		'<div class="{class:header}">' +
			'<div class="{class:userInfoWrapper}">' +
				'<div class="{class:avatar}"></div>' +
				'<div class="{class:fields}">' +
					'<div class="{class:fieldsWrapper}">' +
						'<div class="{class:nameContainer} {class:border}">' +
							'<input class="{class:name} echo-primaryFont echo-primaryColor">' +
						'</div>' +
						'<div class="{class:urlContainer} {class:border}">' +
							'<input class="{class:url} echo-primaryFont echo-primaryColor">' +
						'</div>' +
					'</div>' +
				'</div>' +
				'<div class="echo-clear"></div>' +
			'</div>' +
		'</div>' +
		'<div class="{class:body}">' +
			'<div class="{class:content} {class:border}">' +
				'<textarea class="{class:text} {class:textArea} echo-primaryFont echo-primaryColor"></textarea>' +
			'</div>' +
			'<div class="{class:markersContainer} {class:metadataContainer} echo-primaryFont echo-primaryColor">' +
				'<div class="{class:metadataLabel}">{label:markers}</div>' +
				'<div class="{class:metadataWrapper}">' +
					'<div class="{class:metadataSubwrapper} {class:border} ">' +
						'<input class="{class:markers} echo-primaryFont" data-renderer="markers">' +
					'</div>' +
				'</div>' +
				'<div class="echo-clear"></div>' +
			'</div>' +
			'<div class="{class:tagsContainer} {class:metadataContainer} echo-primaryFont echo-primaryColor">' +
				'<div class="{class:metadataLabel}">{label:tags}</div>' +
				'<div class="{class:metadataWrapper}">' +
					'<div class="{class:metadataSubwrapper} {class:border} ">' +
						'<input class="{class:tags} {class:border} echo-primaryFont">' +
					'</div>' +
				'</div>' +
				'<div class="echo-clear"></div>' +
			'</div>' +
		'</div>' +
		'<div class="{class:controls}">' +
			'<div class="{class:postContainer} echo-ui">' +
				'<button class="{class:postButton} echo-primaryFont"></button>' +
			'</div>' +
			'<div class="echo-clear"></div>' +
		'</div>' +
	'</div>';

// renderers
	
submit.renderers.tagsContainer = 
submit.renderers.markersContainer = function(element) {
	return (this.user.any("roles", ["administrator", "moderator"])) ? element.show() : element.hide();
};

submit.renderers.markers = function(element) {
	return this.metaFields(element, "markers");
};

submit.renderers.tags = function(element) {
	return this.metaFields(element, "tags");
};

submit.renderers.text = function(element) {
	var content = this.config.get("data.object.content");
	if (content) {
		element.val(content);
	}
	element.iHint({
		"text": this.config.get("actionString"),
		"className": "echo-secondaryColor"
	});
	return element;
};

submit.renderers.avatar = function(element) {
	var avatar = this.user.get("avatar", this.user.config.get("defaultAvatar"));
	return element.append('<img src="' + avatar + '">');
};

submit.renderers.name = function(element) {
	return element.val(this.user.get("name", "")).iHint({
		"text": this.labels.get("yourName"),
		"className": "echo-secondaryColor"
	});
};

submit.renderers.url = function(element) {
	return element.val(this.user.get("domain", "")).iHint({
		"text": this.labels.get("yourWebsiteOptional"),
		"className": "echo-secondaryColor"
	});
};

submit.renderers.postButton = function(element) {
	var self = this;
	var states = {
		"normal": {
			"icon": false,
			"disabled": false,
			"label": self.labels.get("post")
		},
		"posting": {
			"icon": "icon-waiting",
			"disabled": true,
			"label": self.labels.get("posting")
		}
	};
	var button = new Echo.Button(element, states['normal']);
	this.posting = this.posting || {};
	this.posting.subscriptions = this.posting.subscriptions || [];
	var subscribe = function(phase, state, callback) {
		var topic = "Submit.onPost" + phase;
		var sub = self.posting.subscriptions;
		if (sub[topic]) {
			self.events.unsubscribe({
				"topic": topic,
				"handlerId": sub[topic]
			});
		}
		var handler = function(eventTopic, eventParams) {
			if (self.config.get("target").get(0) != eventParams.target) return;
			button.set(state);
			if (callback) {
				callback();
			}
		};	
		sub[topic] = self.events.subscribe({
			"topic": topic,
			"handler": handler
		});
	};
	
	subscribe("Init", states['posting']);
	subscribe("Complete", states['normal'], function() {
		self.dom.get("text").val("").trigger("blur");
		self.rerender();
	});
	subscribe("Error", states['normal']);
	
	this.posting.action = this.posting.action || function() {
		var highlighted = false;
		$.each(["name", "text"], function (i, v) {
			var e = self.dom.get(v);
			highlighted = self.highlightMandatory(e);
			return !highlighted;
		});
		if (highlighted) return;
		self.post();
	};
	element.unbind("click", this.posting.action).bind("click", this.posting.action);
	return element;
};

// methods

submit.methods.post = function() {
	var self = this;
	var publish = function(phase, data) {
		var params = {
			"topic": "Submit.onPost" + phase,
			"data": self.prepareBroadcastParams({
				"postData": data
			})
		};
		self.events.publish(params);
	};
	var content = [].concat(this.getActivity('post', 'comment', this.dom.get('text').val()),
				this.getActivity('tag', "marker", this.dom.get("markers").val()),
				this.getActivity('tag', 'tag', this.dom.get("tags").val()));
	var entry= {
		"content": content,
		"appkey": this.config.get("appkey"),
		"sessionID": this.user.get("sessionID", "")
	};
	if (this.config.get("targetQuery")) {
		entry["target-query"] = this.config.get("targetQuery");
	}
	var timer;
	var hasPreviousTimeout = false;
	var callbacks = {
		"onData": function(data) {
			publish("Complete", content);
		},
		"onError": function(data) {
			data = data || {};
			if (timer) clearTimeout(timer);
			// we have previous timeout on the client side so we just ignore errors from server side
			if (hasPreviousTimeout) return;
			var isNetworkTimeout = hasPreviousTimeout = (data.errorCode == "network_timeout");
			var message = isNetworkTimeout
				? self.labels.get("postingTimeout")
				: self.labels.get("postingFailed", {"error": data.errorMessage || data.errorCode});
			$.fancybox({
				"content": '<div class="' + this._cssClassFromControlName() + '-error">' + message + '</div>',
				"height": 70,
				"width": isNetworkTimeout ? 320 : 390,
				"padding": 15,
				"orig": get("text"),
				"autoDimensions": false,
				"transitionIn": "elastic",
				"transitionOut": "elastic",
				"onComplete": function() {
					// set fixed dimensions of the fancybox-wrap (for IE in quirks mode it should be bigger)
					if ($.browser.msie && document.compatMode != "CSS1Compat") {
						var options = arguments[2];
						var delta = 2 * options.padding + 40;
						$("#fancybox-wrap").css({
							"width": options.width + delta,
							"height": options.height + delta
						});
					}
				}
			});
			publish("Error", data);
		}
	};
	publish("Init", content);
	Echo.StreamServer.API.request({
		"endpoint": "submit",
		"apiBaseURL": this.config.get("submissionProxyURL"),
		"data": entry,
		"onData": callbacks['onData'],
		"onError": callbacks['onError']
	}).send();
	var postingTimeout = this.config.get("postingTimeout");
	if (postingTimeout) {
		timer = setTimeout(function() {
			callback({"result": "error", "errorCode": "network_timeout"});
		}, postingTimeout * 1000);
	}
};

submit.methods.metaFields = function(element, type) {
	var data = this.config.get("data.object." + type, this.config.get(type, []));
	var value = $.trim(Echo.Utils.stripTags(data.join(", ")));
	return element.iHint({
		"text": this.labels.get(type + "Hint"),
		"className": "echo-secondaryColor"
	}).val(value).blur();
};

submit.methods.getActivity = function(verb, type, data) {
	return {
		"actor": {
			"objectTypes": [ "http://activitystrea.ms/schema/1.0/person" ],
			"name": this.user.get("name", ( this.user.is("logged") ? "" : this.dom.get("name").val() )),
			"avatar": this.user.get("avatar", "")
		},
		"object": {
			"objectTypes": [ "http://activitystrea.ms/schema/1.0/" + type ],
			"content": data,
		},
		"source": this.config.get("source"),
		"verbs": [ "http://activitystrea.ms/schema/1.0/" + verb ],
		"targets": [{
			"id": this.config.get("targetURL")
		}]
	};
};

submit.methods.highlightMandatory = function(element) {
	if (element && !$.trim(element.val())) {
		var css = this._cssClassFromControlName() + "-mandatory";
		element.parent().addClass(css);
		element.focus(function() {
			$(this).parent().removeClass(css);
		});
		return true;
	}
	return false;
};

submit.methods.prepareBroadcastParams = function(params) {
	params = params || {};
	params.data = this.config.get("data");
	params.target = this.config.get("target").get(0);
	params.targetURL = this.config.get("targetURL");
	return params;
};

submit.css =
	'.{class:header} { margin-bottom: 3px; }' +
	'.{class:avatar} { float: left; margin-right: -48px; }' +
	'.{class:avatar} img { width: 48px; height: 48px; }' +
	'.{class:fields} { width: 100%; float: left; }' +
	'.{class:fields} input { width: 100%; }' +
	'.{class:fieldsWrapper} { margin-left: 53px; }' +
	'.{class:nameContainer} { margin: 1px 0px 4px 0px; padding: 0px 2px 1px 3px; background-color: #fff; }' +
	'.{class:name} { font-size: 14px; font-weight: bold; border: none; }' +
	'.{class:urlContainer} { padding: 0px 2px 1px 3px; background-color: #fff; }' +
	'.{class:url} { height: 19px; border: none; }' +
	'.{class:author} { font-weight: bold; }' +
	'.{class:content} { padding: 5px 5px 5px 6px; background-color: #fff; }' +
	'.{class:textArea} { width: 100%; height: 102px; padding: 0px; margin: 0px; border: none; resize:none ; }' +
	'.{class:text} input { width: 100%; border: none; }' +
	'.{class:metadataContainer} { margin-top: 6px; }' +
	'.{class:metadataLabel} { float: left; width: 50px; margin-right: -50px; text-align: right; line-height: 22px; }' +
	'.{class:metadataWrapper} { float: left; width: 100%; }' +
	'.{class:metadataSubwrapper} { margin-left: 55px; padding: 2px 2px 2px 3px; background-color: #fff; }' +
	'.{class:metadataSubwrapper} input { width: 100%; border: none; }' +
	'.{class:controls} { margin-top: 5px; }' +
	'.{class:postContainer} { float: right; }' +
	'.{class:border} { border: 1px solid #d2d2d2; }' +
	'.{class:mandatory} { border: 1px solid red; }' +
	'.{class:queriesViewOption} { padding-right: 5px; }' +
	'.{class:error} { color: #444444; font: 14px Arial; line-height: 150%; padding-left: 85px; background: no-repeat url("' + cdnBaseURL + 'images/info70.png"); height: 70px; }' +
	(($.browser.msie) ?
		'.{class:container} { zoom: 1; }' +
		'.{class:body} { zoom: 1; }' +
		'.{class:header} { zoom: 1; }' +
		'.{class:content} { zoom: 1; }' +
		'.{class:markersContainer} { zoom: 1; }' +
		'.{class:tagsContainer} { zoom: 1; }' : '') +
	(($.browser.webkit) ?
		// get rid of extra gray line inside input elements on iOS
		'.{class:container } input { background-position: 0px; }' +
		'.{class:container } textarea { background-position: 0px; }' +
		'.{class:textArea} { outline: none; }' +
		'.{class:name} { outline: none; }' +
		'.{class:url} { outline: none; }' +
		'.{class:metadataSubwrapper} input { outline: none; }' : '');

Echo.Control.create(submit);

}