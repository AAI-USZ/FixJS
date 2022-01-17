function(a) {
enyo.dispatch({
type: "lowMemory",
state: a.state
});
}