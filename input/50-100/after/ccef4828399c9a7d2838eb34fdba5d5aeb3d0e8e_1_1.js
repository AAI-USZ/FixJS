f				if (p != undefined) this.position = p.clone();
				if (d != undefined) this.data = d.replace(
					// /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, function (a) {
					/[\u0000-\u0008\u000b-\u001f\u007f]/g, function (a) {
						return toVisibleControl(a.charCodeAt(0));
					});
			},
