function() {

		var noop = function() {},

			textManager = new TextManager();

			

		textManager.writeText("foo");

		textManager.render({ context: { fillText: noop }}, 0);

		equal(textManager.items.length, 0, "buffer cleared by renderText");

	}