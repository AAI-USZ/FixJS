function (require, exports, module) {
	'use strict';

	var Inspector = brackets.getModule("LiveDevelopment/Inspector/Inspector");
	var Trace = require("Trace");

	var _breakpoints = {};

	var nextNumber = 1;

	var $exports = $(exports);

	// Breakpoints Class
	function Breakpoint(location, condition, isTracePoint) {
		this.location = location;
		this.condition = condition;
		this.trace = [];
		
		this.number = nextNumber++;
		this.active = false;

		if (isTracePoint) {
			this.haltOnPause = false;
			this.traceOnPause = true;
		} else {
			this.haltOnPause = true;
			this.traceOnPause = false;
		}
	}

	// Breakpoints Methods
	Breakpoint.prototype = {

		// set the breakpoint in the Inspector
		set: function () {
			_breakpoints[this.number] = this;
			this.active = true;
			
			var self = this;
			var l = this.location;
			Inspector.Debugger.setBreakpointByUrl(l.lineNumber, l.url, l.urlRegex, l.columnNumber, this.condition, function (res) {
				// res = {breakpointId, locations}
				self.id = res.breakpointId;
				self.resolvedLocations = [];
				$(self).triggerHandler("set", { breakpoint: self });
				self._addResolvedLocations(res.locations);
			});
		},

		// remove the breakpoint in the Inspector
		remove: function () {
			delete _breakpoints[this.number];
			this.active = false;
			
			var self = this;
			Inspector.Debugger.removeBreakpoint(this.id, function (res) {
				// res = {}
				$(self).triggerHandler("remove", { breakpoint: self });
				delete self.id;
				delete self.resolvedLocations;
			});
		},

		// toggle the breakpoint
		toggle: function () {
			if (this.active) {
				this.remove();
			} else {
				this.set();
			}
		},

		// matches the breakpoint's type, location, and condition
		matches: function (location, condition) {
			return this.location.url === location.url &&
				this.location.urlRegex === location.urlRegex &&
				this.location.lineNumber === location.lineNumber &&
				this.location.columnNumber === location.columnNumber &&
				this.condition === condition;
		},

		// matches the breakpoint's resolved locations
		matchesResolved: function (location) {
			for (var i in this.resolvedLocations) {
				var l = this.resolvedLocations[i];
				if (l.scriptId === location.scriptId &&
					l.lineNumber === location.lineNumber &&
					l.columnNumber === location.columnNumber) {
					return true;
				}
			}
			return false;
		},

		// add a resolved location
		_addResolvedLocations: function (locations) {
			var $this = $(this), i, location;
			for (i in locations) {
				location = locations[i];
				if (this.matchesResolved(location)) continue;
				this.resolvedLocations.push(location);
				$this.triggerHandler("resolve", { breakpoint: this, location: location });
			}
		},

		// reset the trace
		_reset: function () {
			this.trace = [];
		},

		// trigger paused
		triggerPaused: function (callFrames) {
			if (this.traceOnPause) {
				var trace = new Trace.Trace(callFrames);
				this.trace.push(trace);
			}
		}

	};

	// Inspector Event: breakpoint resolved
	function _onBreakpointResolved(res) {
		// res = {breakpointId, location}
		var breakpoint = findById(res.breakpointId);
		if (breakpoint) {
			breakpoint._addResolvedLocations([res.location]);
		}
	}

	// Inspector Event: Debugger.globalObjectCleared
	function _onGlobalObjectCleared() {
		// Reset the trace array for all tracepoints
		for (var i in _breakpoints) {
			_breakpoints[i]._reset();
		}
	}

	// Inspector connected
	function _onConnect() {
		Inspector.Debugger.enable();
		for (var i in _breakpoints) {
			var b = _breakpoints[i];
			if (b.active) {
				b.set();
			}
		}
	}

	// Init
	function init() {
		Inspector.on("connect", _onConnect);
		Inspector.on("Debugger.breakpointResolved", _onBreakpointResolved);
		Inspector.on("Debugger.globalObjectCleared", _onGlobalObjectCleared);
		if (Inspector.connected()) _onConnect();
	}

	// Unload
	function unload() {
		Inspector.off("connect", _onConnect);
		Inspector.off("Debugger.breakpointResolved", _onBreakpointResolved);
		Inspector.off("Debugger.globalObjectCleared", _onGlobalObjectCleared);
		$exports.off();
	}

	// Find resolved breakpoints
	function findResolved(location) {
		var result = [];
		for (var i in _breakpoints) {
			var b = _breakpoints[i];
			if (b.matchesResolved(location)) {
				result.push(b);
			}
		}
		return result;
	}

	// Find breakpoints
	function find(location, condition) {
		for (var i in _breakpoints) {
			var b = _breakpoints[i];
			if (b.matches(location, condition)) {
				return b;
			}
		}
	}

	function findById(id) {
		for (var i in _breakpoints) {
			var b = _breakpoints[i];
			if (b.id === id) {
				return b;
			}
		}
	}

	exports.init = init;
	exports.unload = unload;
	exports.find = find;
	exports.findResolved = findResolved;
	exports.Breakpoint = Breakpoint;
}