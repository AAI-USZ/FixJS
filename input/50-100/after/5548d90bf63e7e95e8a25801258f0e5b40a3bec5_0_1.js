function(evt) {
		sink.write(
				arguments.callee,	// this object Needed for demuxing.
			// decompose event before passing across pass,
			//  since otherwise the java side of the bridge gets stuck with the overhead of numerous round trips back across the bridge,
			//  one for every single property that needed to be obtained.
				evt.type,
				evt.target.id,
				evt.timeStamp,
				evt.screenX,
				evt.screenY,
				evt.pageX,
				evt.pageY,
				evt.clientX,
				evt.clientY,
				evt.shiftKey,
				evt.metaKey,
				evt.ctrlKey,
				evt.altKey,
				evt.button,
				evt.which
		);
	}