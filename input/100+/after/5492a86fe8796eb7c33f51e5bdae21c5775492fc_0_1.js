function(diff) {
						inst.drawYear = drawYear += diff;
						dpTitle.children(':first').text(drawYear);
						inMinYear = (minYear !== undefined && minYear == drawYear);
						inMaxYear = (maxYear !== undefined && maxYear == drawYear);
						_updatePrevNextYear_MYP();
					}