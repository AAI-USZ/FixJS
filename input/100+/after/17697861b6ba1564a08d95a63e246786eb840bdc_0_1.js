function render(ts) {
		var wid,
			anis,
			ani,
			elem,
			i,
			j,
			len,
			from,
			to,
			pct,
			progress,
			val,
			vals;

		needsRender = 0;

		for (wid in animations) {
			for (anis = animations[wid], i = 0; i < anis.length; i++) {
				ani = anis[i];
				if (!ani.paused) {
					pct = ani.duration ? Math.min(1, (ts - ani.ts) / ani.duration) : 1;
					progress = curves[ani.curve](ani.forward ? pct : 1 - pct);
					elem = ani.elem;

					if (elem._isAttachedToActiveWin()) {
						for (prop in ani.props) {
							vals = ani.props[prop];
							from = vals[0];
							to = vals[1];

							if (pct === 1) {
								val = ani.forward ? to : from;
							}

							if (prop === "transform") {
								if (pct !== 1) {
									val = [];
									len = from.length;
									for (j = 0; j < len; j++) {
										// we skip index 12-14 because those are the rotation vector
										if (j < 12) {
											val[j] = from[j] + ((to[j] - from[j]) * progress);
										} else if (j > 14) {
											val[j] = Math.floor(from[j] + ((to[j] - from[j]) * progress));
										}
									}
									needsRender = 1;
								}

								if (val.length === 16) {
									j = val.splice(12);
									val = "matrix3d(" + val.join(',') + ") rotate3d(" + j.join(',') + "deg)";
								} else {
									j = val.pop();
									val = "matrix(" + val.join(',') + ") rotate(" + j + "deg)";
								}

								prop = transformName;

							} else if (colorOptions[prop]) {
								if (pct !== 1) {
									val = [];
									for (j = 0; j < 4; j++) {
										val[j] = Math.floor(from[j] + ((to[j] - from[j]) * progress));
									}
									needsRender = 1;
								}
								val = "rgba(" + val.join(',') + ")";

							} else if (positionOptions[prop]) {
								if (pct !== 1) {
									val = from + ((to - from) * progress);
									needsRender = 1;
								}
								val = prop === "opacity" ? val : val + "px";
							}

							ani.prev !== val && (elem.domNode.style[prop] = val);
							ani.prev = val;
						}
					}

					if (pct === 1) {
						ani.ts = ts;
						if (ani.duration && ani.reverse && ani.forward) {
							ani.forward = 0;
							needsRender = 1;
						} else if (ani.repeat-- > 0) {
							needsRender = ani.forward = 1;
						} else {
							// we need to remove this animation before resolving
							anis.splice(i--, 1);
							ani.promise.resolve();
							if (!anis.length) {
								delete animations[wid];
							}
						}
					}
				}
			}
		}

		needsRender && pump();
	}