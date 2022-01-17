function() {
if ((window.PalmSystem) && (window.PalmSystem.getResource) && (!window.palmGetResource)) {window.palmGetResource = PalmSystem.getResource;}
window.addEventListener("load", enyo.ready, !1), window.addEventListener("resize", enyo.sendOrientationChange, !1), Mojo = window.Mojo || {}, Mojo.lowMemoryNotification = function(a) {
enyo.dispatch({
type: "lowMemory",
state: a.state
});
};
}