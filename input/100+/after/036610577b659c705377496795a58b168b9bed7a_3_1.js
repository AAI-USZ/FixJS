function writeMessage(message) {
		MSGLAYER.removeChildren();
		MSGLAYER.clear();
		if(message != "")
		{
			var text = new Kinetic.Text({
				x: 10, y: 10,
				stroke: '#555', strokeWidth: 5, fill: '#ddd',
				text : message,
				fontSize: 18, fontStyle: "italic", textFill: "#555",
				width: 400, padding: 20,
				shadow: { color: 'black', blur: 1, offset: [10, 10], alpha: 0.2 }
			});
			MSGLAYER.add(text);
		}
		MSGLAYER.draw();
    }