function _onRemoveBreakpoint(event, res) {
		var locations = res.breakpoint.resolvedLocations;
		for (var i in locations) {
			locations[i].url = ScriptAgent.scriptWithId(locations[i].scriptId).url;
			$exports.triggerHandler('removeBreakpoint', locations[i]);
		}
	}