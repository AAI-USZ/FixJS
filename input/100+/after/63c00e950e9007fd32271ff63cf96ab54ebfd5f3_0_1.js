function (e) {
						var obj = (e.target || e.srcElement);
						if (obj.href || obj.type) return true;
						if($(this).hasClass('trSelected')){
							$(this).removeClass('trSelected');
							$('td[abbr=check_box] img', this).attr('src', rootAppPath+'orca/_images/checkbox_no.png');
						}else{
							$(this).addClass('trSelected');
							$('td[abbr=check_box] img', this).attr('src', rootAppPath+'orca/_images/checkbox_yes.png');
						}
						if (p.singleSelect) $(this).siblings().removeClass('trSelected');
					}