function (e) {
						var obj = (e.target || e.srcElement);
						if (obj.href || obj.type) return true;
						$(this).toggleClass('trSelected');
						if (p.singleSelect && ! g.multisel ) {
							$(this).siblings().removeClass('trSelected');
							$(this).toggleClass('trSelected');
						}
					}