function (slot, value) {
	
	console.log ("Setting " + slot + " to " + value);
	// Now, we call the superclass
    Curve.superclass.setValue.call(this, slot, value);

}