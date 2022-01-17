function(titleBar) {
		
		if (bb.device.isBB10) {
			var res = (bb.device.isPlayBook) ? 'lowres' : 'hires',
				button;
			titleBar.setAttribute('class', 'bb-bb10-title-bar-'+res +' bb-bb10-title-bar-' + bb.actionBar.color);
			titleBar.innerHTML = titleBar.getAttribute('data-bb-caption');
			// Get our back button if provided
			if (titleBar.hasAttribute('data-bb-back-caption')) {
				button = document.createElement('div');
				button.innerHTML = titleBar.getAttribute('data-bb-back-caption');
				titleBar.appendChild(button);
				titleBar.backButton = button;
				button.onclick = bb.popScreen;
				bb.titleBar.styleBB10Button(button);
				button.style.left = '0px';
			}
			// Get our action button if provided
			if (titleBar.hasAttribute('data-bb-action-caption')) {
				button = document.createElement('div');
				button.innerHTML = titleBar.getAttribute('data-bb-action-caption');
				if (titleBar.hasAttribute('onactionclick')) {
					button.onactionclick = titleBar.getAttribute('onactionclick');
					button.onclick = function() {
									eval(this.onactionclick);
								};
				} else if (titleBar.onactionclick) {
					button.onclick = onactionclick;
				}
				//button.onclick = bb.popScreen;
				bb.titleBar.styleBB10Button(button);
				button.style.right = '0px';
				titleBar.appendChild(button);
				titleBar.actionButton = button;
			}
			// Create an adjustment function for the widths
			if (titleBar.actionButton && titleBar.backButton) {
			
				titleBar.evenButtonWidths = function() {
										var backWidth = parseInt(window.getComputedStyle(this.backButton).width),
											actionWidth = parseInt(window.getComputedStyle(this.actionButton).width);
										if (backWidth > actionWidth) {
											this.actionButton.style.width = backWidth +'px';
										} else {
											this.backButton.style.width = actionWidth +'px';
										}
									};
				titleBar.evenButtonWidths = titleBar.evenButtonWidths.bind(titleBar);
				window.setTimeout(titleBar.evenButtonWidths,0);
			}
		} else if (bb.device.isPlayBook) {
			titleBar.setAttribute('class', 'pb-title-bar');
			titleBar.innerHTML = titleBar.getAttribute('data-bb-caption');
			if (titleBar.hasAttribute('data-bb-back-caption')) {
				var button = document.createElement('div'), 
					buttonInner = document.createElement('div');
				button.setAttribute('class', 'pb-title-bar-back');
				button.onclick = bb.popScreen;
				buttonInner.setAttribute('class','pb-title-bar-back-inner');
				buttonInner.innerHTML = titleBar.getAttribute('data-bb-back-caption'); 
				button.appendChild(buttonInner);
				titleBar.appendChild(button);
			}
		} else {
			if (titleBar.hasAttribute('data-bb-caption')) {
				if (bb.device.isHiRes) {
					titleBar.setAttribute('class', 'bb-hires-screen-title');
				} else {
					titleBar.setAttribute('class', 'bb-lowres-screen-title');
				}
				titleBar.innerHTML = titleBar.getAttribute('data-bb-caption');
			}
		}
	}