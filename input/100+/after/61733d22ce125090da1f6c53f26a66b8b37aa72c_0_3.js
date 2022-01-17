function() {

	"use strict";

	var defaults = {
		slug: null,
		processInterval: 30
	};
	var report = {
		ExceptionType: "",
		StackTrace: "",
		HttpVerb: "",
		ReferrerUrl: "",
		ExceptionMessage: "",
		RelativeUrl: "",
		ApplicationType: "",
		OccurrenceTimeUtc: "",
		User: "",
		PostValuePairs: [],
		QueryValuePairs: [],
		ServerVariable: [],
		Cookies: [],
		UniqueId: "",
		UserAgent: "",
		MachineName: ""
	};
	var settings = {};
	var messageQueue = [];
	var processInterval;

	// clone a JSON object
	var cloneObject = function(obj) {
		var clone = {};
		for (var i in obj) {
			if(typeof(obj[i]) === "object") {
				clone[i] = cloneObject(obj[i]);
			} else {
				clone[i] = obj[i];
			}
		}
		return clone;
	};

	// merge two objects together, without using $.extend
	var merge = function(obj1,obj2) {
		var obj3 = {};
		for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
		for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
		return obj3;
	};

	var addHandler = function(obj, evnt, handler) {
		if (obj.addEventListener) {
			obj.addEventListener(evnt.replace(/^on/, ''), handler, false);
		} else {
			if (obj[evnt]) {
				var origHandler = obj[evnt];
				obj[evnt] = function(evt) {
					origHandler(evt);
					handler(evt);
				};
			} else {
				obj[evnt] = function(evt) {
					handler(evt);
				};
			}
		}
	};

	var attachListeners = function() {

		// attach error listener
		addHandler(window, 'onerror', function (msg, url, num) {
			handleError(msg,url,num);
			return true;
		});

		// attach loop to send to server
		processInterval = window.setInterval(function() {
			if (messageQueue.length) {
				processQueue();
			}
		}, 10*1000);

	};

	var handleError = function(msg, url, num) {
		var newReport = cloneObject(report);
		newReport.OccurrenceTimeUtc = (msg.timeStamp) ? msg.timeStamp : + new Date();
		newReport.ExceptionMessage = (msg.message) ? msg.message : "";

		// common
		newReport.UserAgent = navigator.userAgent;
		newReport.Cookies = document.cookie;
		newReport.RelativeUrl = document.location.pathname;
		newReport.ReferrerUrl = document.referrer;

		messageQueue.push(newReport);

		tempTestingFunction(newReport);
	};

	var catchManual = function(e) {
		var newReport = cloneObject(report);
		newReport.OccurrenceTimeUtc = + new Date();
		newReport.ExceptionType = e.type;
		newReport.ExceptionMessage = e.message;
		newReport.StackTrace = (e.stack) ? e.stack : "";

		// common
		newReport.UserAgent = navigator.userAgent;
		newReport.Cookies = document.cookie;
		newReport.RelativeUrl = document.location.pathname;
		newReport.ReferrerUrl = document.referrer;

		messageQueue.push(newReport);

		tempTestingFunction(newReport);

	};

	var processQueue = function() {
		while (messageQueue.length) {
			console.log("send to server", messageQueue.length + " items remain");
			messageQueue.shift(); 
		}
	};

	var loadOptions = function() {
		var scripts = document.getElementsByTagName("script");
		var thisScript;
		for (var i = 0, len = scripts.length; i < len; i++) {
			if (scripts[i].src.indexOf("appfail-reporting.js") > -1) {
				thisScript = scripts [i];
				break;
			}
		}
		if (thisScript.src.indexOf("?") === -1) {
			return;
		}
		var queryString = thisScript.src.split("?")[1];
		var queryStringVars = queryString.split("&");
		var queryObj = {};
		for (var j = 0, lenj = queryStringVars.length; j < lenj; j++) {
			var splitObj = queryStringVars[j].split("=");
			queryObj[splitObj[0]] = splitObj[1];
		}
		settings = merge(defaults,queryObj);
	};

	var init = (function() {
		loadOptions();
		if (!settings.slug) {
			if (console && console.error) {
				console.error("AppFail: No application slug was found.");
			}
			return;
		}
		attachListeners();
	})();

	return {
		catchManual: catchManual,
		processQueue: processQueue
	};

}