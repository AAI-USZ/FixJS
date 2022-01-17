function() {

	"use strict";

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

	var cloneObject = function(obj) {
		var clone = {};
		for(var i in obj) {
			if(typeof(obj[i]) === "object") {
				clone[i] = cloneObject(obj[i]);
			} else {
				clone[i] = obj[i];
			}
		}
		return clone;
	};

	var attachErrorListener = function() {
		addHandler(window, 'onerror', function (msg, url, num) {
			console.log(msg, url, num);
			handleError(msg,url,num);
			return true;
		});
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

		console.log(newReport);
		tempTestingFunction(newReport);
	};

	var catchManual = function(e) {
		console.log(e);
		console.log("e.stack: ",e.stack);
		console.log("e.message: ",e.message);
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

		console.log(newReport);
		tempTestingFunction(newReport);
	};

	var init = (function() {
		attachErrorListener();
	})();

	return {
		catchManual: catchManual
	};

}