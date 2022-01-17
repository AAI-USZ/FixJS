function()
{
	// Peek at the oldest handler in our list and see if if thinks it's done.
	var latest = this.handlers[0];
	var handler = latest[0];
	var callback = latest[1];

	if ((handler !== undefined) && (handler !== null))
	{
		handler.process(this.buffer);
		if (handler.complete)
		{
			// shift it off & reset
			this.handlers.shift();
			this.buffer = undefined;
			if (handler.success)
				callback.call.apply(callback, [null, null].concat(handler.args));
			else
				callback.call(null, handler.args[0]);
		}
		else
			handler.reset();
	}
}