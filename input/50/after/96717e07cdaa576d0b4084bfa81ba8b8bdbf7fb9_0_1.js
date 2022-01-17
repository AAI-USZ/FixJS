function SlotLite( listener, target ) {

	this.next = null; // SlotLite

	this.prev = null; // SlotLite

	this.listener = listener; // Function

	this.target = target;

}