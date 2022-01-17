function() {
								var windowHeight,
									itemHeight,
									margin;
								if (bb.device.isPlayBook) {
									itemHeight = 53;
									// Hack for ripple
									if (!window.orientation) {
										windowHeight = window.innerHeight;
									} else if (window.orientation == 0 || window.orientation == 180) {
										windowHeight = 600;
									} else if (window.orientation == -90 || window.orientation == 90) {
										windowHeight = 1024;
									}
								} else {
									itemHeight = 111;
									if (!window.orientation) {
										windowHeight = window.innerHeight;
									} else if (window.orientation == 0 || window.orientation == 180) {
										windowHeight = 1280;
									} else if (window.orientation == -90 || window.orientation == 90) {
										windowHeight = 768;
									}
								}
								margin = windowHeight - Math.floor(windowHeight/2) - Math.floor((this.actions.length * itemHeight)/2) - itemHeight; //itemHeight is the header
								this.actions[0].style['margin-top'] = margin + 'px';
							}