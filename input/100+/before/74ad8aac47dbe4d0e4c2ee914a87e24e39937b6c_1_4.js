function() {
								var windowHeight,
									itemHeight,
									margin;
								if (bb.device.isPlayBook) {
									itemHeight = 53;
									if (window.orientation == 0 || window.orientation == 180) {
										windowHeight = 600;
									} else if (window.orientation == -90 || window.orientation == 90) {
										windowHeight = 1024;
									}
								} else {
									itemHeight = 111;
									if (window.orientation == 0 || window.orientation == 180) {
										windowHeight = 1280;
									} else if (window.orientation == -90 || window.orientation == 90) {
										windowHeight = 768;
									}
								}
								margin = Math.floor(windowHeight/2) - Math.floor((this.actions.length * itemHeight)/2);
								this.header.style['margin-bottom'] = margin + 'px';
							}