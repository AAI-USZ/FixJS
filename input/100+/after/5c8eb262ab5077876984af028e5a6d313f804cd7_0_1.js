function(dx, dy) {
					var rx, ry, rdx, rdy, mx, my, sx, sy;

					var
						sin = ft.o.rotate.sin,
						cos = ft.o.rotate.cos
						;

					// viewBox might be scaled
					if ( ft.o.viewBoxRatio ) {
						dx *= ft.o.viewBoxRatio.x;
						dy *= ft.o.viewBoxRatio.y;
					}

					// First rotate dx, dy to element alignment
					rx = dx * cos - dy * sin;
					ry = dx * sin + dy * cos;

					// Then clip to scale restriction
					if ( ft.opts.keepRatio ) { rx = ry * ( handle.x * handle.y < 0 ? -1 : 1 ); }

					rx *= Math.abs(handle.x);
					ry *= Math.abs(handle.y);

					// And finally rotate back to canvas alignment
					rdx = rx *   cos + ry * sin;
					rdy = rx * - sin + ry * cos;

					ft.attrs.translate = {
						x: ft.o.translate.x + rdx / 2,
						y: ft.o.translate.y + rdy / 2
						};

					// Mouse position, relative to element center after translation
					mx = ft.o.handlePos.cx + dx - ft.attrs.center.x - ft.attrs.translate.x;
					my = ft.o.handlePos.cy + dy - ft.attrs.center.y - ft.attrs.translate.y;

					// Position rotated to align with element
					rx = mx * cos - my * sin;
					ry = mx * sin + my * cos;

					// Scale element so that handle is at mouse position
					sx = rx * 2 * handle.x / ft.o.size.x;
					sy = ry * 2 * handle.y / ft.o.size.y;

					ft.attrs.scale = {
						x: sx || ft.attrs.scale.x,
						y: sy || ft.attrs.scale.y
						};

					applyLimits();

					ft.apply();

					asyncCallback([ 'scale' ]);
				}