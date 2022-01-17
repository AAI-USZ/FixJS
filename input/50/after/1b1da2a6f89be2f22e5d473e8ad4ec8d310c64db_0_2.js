function(name, ev) {
    Mojo.Log.info("Changed pref: " + name + " to " + ev);
    this.prefs[name] = ev.value;
}