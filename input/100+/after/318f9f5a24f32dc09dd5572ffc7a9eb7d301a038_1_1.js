function(){
	// trigger platform ready on load
	window.addEventListener("load", enyo.ready, false);
	// setup orientation change event
	window.addEventListener("resize", enyo.sendOrientationChange, false);

	// LunaSysMgr calls use Mojo namespace atm
	Mojo = window.Mojo || {};

        if ((window.PalmSystem) && (window.PalmSystem.getResource) && (!window.palmGetResource)) {
            window.palmGetResource = PalmSystem.getResource;
        }

	// system level events
	//
	// On a webOS device, Enyo will send a "lowMemory" event to the first component created.  This has a `state`
	// property with the value "low", "critical", or "normal".  Applications that use significant memory
	// can watch for this event and try to reduce their memory usage when they see a non-normal state.
	Mojo.lowMemoryNotification = function(params) {
		enyo.dispatch({type: "lowMemory", state: params.state});
	};
}