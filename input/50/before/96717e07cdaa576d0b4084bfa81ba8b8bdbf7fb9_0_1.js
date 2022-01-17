function SignalLite( target )
{
	/**
	 * The empty first slot in a linked set.
	 * @private
	 */
	this.first = new SlotLite;
	
	/**
	 * The last Slot is initially a reference to the same slot as the first.
	 * @private
	 */
	this.last = this.first;
	
	/**
	 * The value of this in listeners when dispatching.
	 */
	this.target = target;
}