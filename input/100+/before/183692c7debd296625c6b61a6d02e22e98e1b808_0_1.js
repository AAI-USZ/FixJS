function (e) {
						var obj = (e.target || e.srcElement);
						if (obj.href || obj.type) return true;
						$(this).toggleClass('trSelected');
						if (p.singleSelect) $(this).siblings().removeClass('trSelected');

						var $checkbox = $('.selectMe', this);
						$checkbox.attr('checked', !$checkbox[0].checked);
					}