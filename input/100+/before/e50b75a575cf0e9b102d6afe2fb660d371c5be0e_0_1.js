function (require, exports, module) {
	'use strict';

	var Inspector = brackets.getModule("LiveDevelopment/Inspector/Inspector");

	var _breakpoints = {};

	// Breakpoints Class
	function Breakpoint(location, condition) {
		this.location = location;
		this.condition = condition;
		this.active = false;
	}

	// Breakpoints Methods
	Breakpoint.prototype = {

		// clear the breakpoint in the Inspector
		set: function () {
			var self = this;
			this.active = true;
			var l = this.location;
			Inspector.Debugger.setBreakpointByUrl(l.lineNumber, l.url, l.urlRegex, l.columnNumber, this.condition, function (res) {
				// res = {breakpointId, locations}
				self.id = res.breakpointId;
				self.resolvedLocations = [];
				$(self).triggerHandler("set", { breakpoint: self });
				self._addResolvedLocations(res.locations);
				_breakpoints[self.id] = self;
			});
		},

		// remove the breakpoint in the Inspector
		remove: function () {
			var self = this;
			this.active = false;
			Inspector.Debugger.removeBreakpoint(this.id, function (res) {
				// res = {}
				$(self).triggerHandler("remove", { breakpoint: self });
				delete _breakpoints[self.id];
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
				if (l.url === location.url &&
					l.lineNumber === location.lineNumber &&
					l.columnNumber === location.columnNumber)
					return true;
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
		}

	};

	// Inspector Event: breakpoint resolved
	function _onBreakpointResolved(res) {
		// res = {breakpointId, location}
		var breakpoint = _breakpoints[res.breakpointId];
		if (breakpoint) {
			breakpoint._addResolvedLocations([location]);
		}
	}

	// Inspector connected
	function _onConnect() {
		Inspector.Debugger.enable();
	}

	// Init
	function init() {
		Inspector.on("connect", _onConnect);
		Inspector.on("Debugger.breakpointResolved", _onBreakpointResolved);
		if (Inspector.connected()) _onConnect();
	}

	// Unload
	function unload() {
		Inspector.off("connect", _onConnect);
		Inspector.off("Debugger.breakpointResolved", _onBreakpointResolved);
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

	exports.init = init;
	exports.unload = unload;
	exports.find = find;
	exports.Breakpoint = Breakpoint;
}