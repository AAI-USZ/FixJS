function createIntSetting(setting)
{
	// Label
	let label = new Gtk.Label({
		label: setting.label,
		xalign: 0
	});
	
	// Spin button
	let adjustment = new Gtk.Adjustment({ lower: 30, upper: 365, step_increment: 1});
	let button = new Gtk.SpinButton({adjustment: adjustment,snap_to_ticks: true});
	button.set_value(prefs[setting.id]);
	button.connect('value-changed', function(entry){stateChanged(setting.id,entry.value)});
	
	let box = new Gtk.Box({
		orientation: Gtk.Orientation.HORIZONTAL,
		margin_top: 5
	});
	box.pack_start(label, true, true, 0);
	box.add(button);
	
	// If it's the "dayslongtask" item, it depends on DisplayLong state
	if (setting.id == "DaysLongTask")
	{
		box.set_sensitive(!prefs["DisplayLong"]);
		daysLongTaskBox = box;
	}
	return box;
}