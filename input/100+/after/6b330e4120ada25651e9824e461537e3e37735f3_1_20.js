function () {
		var
			self = this,
			theme = this.options.themes[this.options.theme],
			paper = this._paper || Raphael(
				this._wrapper,
				theme.dim.w,
				theme.dim.h),
			arm = this.drawArmusingSVG(paper, false),
			ftCallback = function(ft, events) {
				// console.info('FT events : ', events);

				self._armRotation = ft.attrs.rotate;

				if (events.indexOf('rotate start') != -1) {
					self._armDragging = true;
					self.drawArmusingSVG(paper, true);
					self.pause();
					self.pauseTransitions();
					self.playTransition({
						transition: 'drag',
						useTransitions: false
					});
				}
				else if (
					events.indexOf('rotate end') != -1
					&& ft.attrs.rotate >= self.options.themes[self.options.theme].arm.area.start
					&& ft.attrs.rotate <= self.options.themes[self.options.theme].arm.area.end
				) {
					self.updatePlayerPosition();
					self.playDiscArea(true);
				}
				else if (events.indexOf('rotate end') != -1 && ft.attrs.rotate != 0) {
					self.placeTheArmOffTheDisc();
				}
				else if (events.indexOf('animate end') != -1 && ft.attrs.rotate == 0) {
					ft.setOpts({ animate: false }, self._armFtCallback);
					self._armInPlace = false;
					self.end(true);

					if (self._needRestart) {
						self.updateTrackInfos();
						self.updateInfos();
						self.updateDiscInfos();
						self.powerON();
						self._needRestart = false;
					}
				}
				else if (events.indexOf('animate end') != -1) {
					ft.setOpts({ animate: false }, self._armFtCallback);
					self._armInPlace = true;
					if (self.getArmArea() != 'undefined') {
						self.play();
					}
					else
						self.enableRemote('start');
				}

				if (events.indexOf('rotate end') != -1) {
					self._armDragging = false;
					self.drawArmusingSVG(paper, false);
				}

				if (
					(events.indexOf('init') == -1 && ft.attrs.rotate != 0)
					&& events.indexOf('animate') == -1
					&& events.indexOf('animate start') == -1
					&& events.indexOf('animate end') == -1
				)
					self.rotateArmShadow();

			},
			ft = paper.freeTransform(
				arm,
				{
					attrs: {
						cursor: 'pointer',
						fill: theme.arm.needle.fill,
						stroke: theme.arm.needle.stroke,
						opacity: 0
					},
					animate: false,
					delay: this.options.animateDelay,
					distance: .95,
					size: 20,
					drag: false,
					scale: false,
					rotateRange: [0, theme.arm.area.end]
				},
				ftCallback
			)
		;

		this._armFt = ft;
		this._armFtCallback = ftCallback;
		this._arm = arm;
	}