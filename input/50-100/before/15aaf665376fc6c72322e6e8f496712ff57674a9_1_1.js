function (msg) {
		ProtView.Global.prot = msg;
		// prot = msg['graph']['coords']['aa'];
		$('#protein').svg({
			// loadURL: 'protein.svg',
			onLoad: ProtView.Graphic.draw, 
			settings: {
				width : "800px",
				height : "800px", 
				xmlns : "http://www.w3.org/2000/svg",
				style : "display:inline; float: left; z-index: 1;"
			}
		});
	}