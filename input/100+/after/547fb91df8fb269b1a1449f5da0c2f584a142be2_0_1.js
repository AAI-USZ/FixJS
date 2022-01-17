function() {

	"use strict";

	var defaults = {
		slug: null,
		processInterval: 10,
		daysToStore: 7,
		onBeforeStore: null
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
	var hasOfflineEvents = ("ononline" in window && "onoffline" in window) ? true: false;
	var hasOnlineBool = (typeof navigator.onLine === "boolean") ? true : false;
	var hasJSON = ("JSON" in window) ? true : false;
	var hasLocalStorage = ("localStorage" in window) ? true : false;

	// helper - clone a JSON object
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

	// helper - merge two objects together, without using $.extend
	var merge = function(obj1,obj2) {
		var obj3 = {};
		for (var attrOne in obj1) { obj3[attrOne] = obj1[attrOne]; }
		for (var attrTwo in obj2) { obj3[attrTwo] = obj2[attrTwo]; }
		return obj3;
	};

	// helper - cross browser add event listener
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



	// xhr intercept script
	(function(XHR) {

		var send = XHR.prototype.send;

		XHR.prototype.send = function(data) {
	        var self = this;
	        var oldOnReadyStateChange;
	        var onReadyStateChange = function() {
	        	console.log(self);
	        	console.log("readyState: ",self.readyState);
	        	console.log("responseText: ",self.responseText);
	        	console.log("status: ",self.status);
	        	console.log("statusText: ",self.statusText);
	        	if (document.location.protocol === "file:") {
	        		printError("error probably occured because it's being run at the file:// level");
	        	}
	            if(oldOnReadyStateChange) {
                	oldOnReadyStateChange();
            	}
	        }

            if (this.addEventListener) {
                this.addEventListener("readystatechange", onReadyStateChange, false);
            } else {
                oldOnReadyStateChange = this.onreadystatechange; 
                this.onreadystatechange = onReadyStateChange;
            }

            try {
	        	send.call(this,data);            	
            } catch(e) {
            	console.log("e: ",e);
            }
	    }

	})(XMLHttpRequest);



	var attachListeners = function() {

		// attach error listener
		addHandler(window, "onerror", function (msg, url, num) {
			handleError(msg,url,num);
			return true;
		});

		// attach loop to send to server
		processInterval = window.setInterval(function() {
			if (messageQueue.length) {
				processQueue();
			}
		}, settings.processInterval*1000);

		if (hasOfflineEvents) {
			addHandler(window, "ononline", function() {
				console.log("came back online");
				loadStoredErrors();
				processQueue();
			});
		}

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

		if (settings.onBeforeStore) {
			settings.onBeforeStore(newReport);
		}

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

		if (settings.onBeforeStore) {
			settings.onBeforeStore(newReport);
		}

		messageQueue.push(newReport);

		tempTestingFunction(newReport);

	};

	var processQueue = function() {
		if (messageQueue.length && hasOnlineBool && !navigator.onLine) {
			printError("No connection found, stored reports to localStorage");
			storeQueue();
			messageQueue = [];
			return;
		}
		while (messageQueue.length) {
			console.log("send to server", messageQueue.length + " items remain");
			messageQueue.shift(); 
		}
	};

	var storeQueue = function() {
		if (hasJSON) {
			var existingErrors = window.localStorage.getItem("appfail-errors");
			if (existingErrors !== "" && existingErrors !== null) {
				var errorArray = JSON.parse(existingErrors);
				for (var i = 0, len = errorArray.length; i < len; i++) {
					messageQueue.push(errorArray[i]);
				}
			}
			window.localStorage.setItem("appfail-errors", JSON.stringify(messageQueue));
		}
	};

	var loadStoredErrors = function() {
		var storedObj;
		var stored = window.localStorage.getItem("appfail-errors");
		if (stored === "" || stored === null) {
			return;
		}
		storedObj = JSON.parse(stored);
		var now = +new Date();
		var day = 86400000;
		var gap = settings.daysToStore * day;
		var cleanedObject = [];
		for (var i = 0, len = storedObj.length; i < len; i++) {
			if (now - gap > storedObj[i].OccurrenceTimeUtc) {
				printError("Dropping an old error");
			} else {
				cleanedObject.push(storedObj[i]);
			}
		}
		messageQueue = cleanedObject;
		window.localStorage.removeItem("appfail-errors");
	};

	var loadOptions = function() {
		if (appfail.config) {
			settings = merge(defaults,appfail.config);
			return;
		}
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

	// IIFE function
	var init = (function() {
		loadOptions();
		if (!settings.slug) {
			printError("No application slug was found.");
			return;
		}
		if (hasOnlineBool && navigator.onLine) {
			loadStoredErrors();			
		}
		attachListeners();
	})();

	var printError = function(str) {
		if (console && console.error) {
			console.error("appfail: " + str);
		}
	};

	// development only
	var runTests = function() {
		console.log("hasOnlineBool: ",hasOnlineBool);
		console.log("hasOfflineEvents: ",hasOfflineEvents);
		console.log("hasJSON: ",hasJSON);
		console.log("hasLocalStorage: ",hasLocalStorage);
	};

	return {
		catchManual: catchManual,
		processQueue: processQueue,
		storeQueue: storeQueue,
		loadStoredErrors: loadStoredErrors,
		runTests: runTests // development only
	};

}