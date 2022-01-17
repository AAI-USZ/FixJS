function () {
		var
			self = this,
			theme = this.options.themes[this.options.theme],
			paper = this._paper || Raphael(
				this._wrapper,
				theme.dim.w, 
				theme.dim.h),
			arm = theme.arm.src 
				? paper.image(
					this.options.paths.themes + theme.arm.src,
					theme.arm.pos.x,
					theme.arm.pos.y,
					theme.arm.dim.w,
					theme.arm.dim.h)
				: paper.rect(
					theme.arm.pos.x,
					theme.arm.pos.y,
					theme.arm.dim.w,
					theme.arm.dim.h)
					.attr({
						'fill': theme.arm.fill,
						'stroke': theme.arm.stroke
					}),
			ftCallback = function(ft, events) {
				// console.info('FT events : ', events);
				self._armRotation = ft.attrs.rotate;
				if (events.indexOf('rotate start') != -1) {
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