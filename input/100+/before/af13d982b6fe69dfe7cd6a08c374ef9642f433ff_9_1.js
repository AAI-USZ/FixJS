function(eX,eY) {
					if(100+70*3 < eX && eX < 150+70*i &&
						150 < eY && eY< 200) {
						ctx.beginPath();
						ctx.save();
						ctx.fillStyle = "white";
						ctx.fillRect(100+70*i, 150, 50,50);
						ctx.fillStyle = '#EF4136';
						ctx.font = '19pt Helvetica';
						ctx.fillText(i,118+70*i,185);
						ctx.restore();
						ctx.closePath();

					} else {
						ctx.beginPath();
						ctx.save();
						ctx.fillStyle = color[((i-3)>=4?(i-3)-4:i-3)];
						ctx.fillRect(100+70*i, 150, 50,50);
						ctx.fillStyle = 'white';
						ctx.font = '19pt Helvetica';
						ctx.fillText(i,118+70*i,185);
						ctx.restore();
						ctx.closePath();
					}
				}