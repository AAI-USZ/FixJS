function () {
		this
			.addHandler('dragging', L.Map.Drag)
			.addHandler('touchZoom', L.Map.TouchZoom)
			.addHandler('doubleClickZoom', L.Map.DoubleClickZoom)
			.addHandler('scrollWheelZoom', L.Map.ScrollWheelZoom)
			.addHandler('boxZoom', L.Map.BoxZoom);
	}