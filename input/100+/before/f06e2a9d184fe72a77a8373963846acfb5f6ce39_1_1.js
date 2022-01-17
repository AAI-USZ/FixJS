function (e) {
				var next,
					_elm = $(e.target),
					_activemenu = $scope.find('.mb-active'),
					_id,
					keychar,
					sublink,
					elmtext,
					matches,
					match,
					level;
				_id = $.map(/\bknav-(\d+)-(\d+)-(\d+)/.exec(_elm.attr('class')), function (n) {
					return parseInt(n, 10);
				});
				if (e.type === "keydown") {
					if (!(e.ctrlKey || e.altKey || e.metaKey)) {
						switch (e.keyCode) {
						case 13: // enter key
							if (_id[2] === 0 && _id[3] === 0) {
								_elm.trigger('item-next');
								return false;
							}
							break;
						case 27: // escape key
							_elm.trigger('close');
							return false;
						case 32: // spacebar
							if (_id[2] === 0 && _id[3] === 0) {
								_elm.trigger('item-next');
							} else {
								window.location = _elm.attr('href');
							}
							return false;
						case 37: // left arrow
							_elm.trigger('section-previous');
							return false;
						case 38: // up arrow
							_elm.trigger('item-previous');
							return false;
						case 39: // right arrow
							_elm.trigger('section-next');
							return false;
						case 40: // down arrow
							_elm.trigger('item-next');
							return false;
						default:
							// 0 - 9 and a - z keys
							if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 64 && e.keyCode < 91)) {
								keychar = String.fromCharCode(e.keyCode).toLowerCase();
								sublink = (_id[2] !== 0 || _id[3] !== 0);
								elmtext = _elm.text();
								matches = _activemenu.find('.mb-sm-open a').filter(function () {
									return ($(this).text().substring(0, 1).toLowerCase() === keychar || (sublink && $(this).text() === elmtext));
								});
								if (matches.length > 0) {
									if (sublink) {
										matches.each(function (index) {
											if ($(this).text() === elmtext) {
												match = index;
												return false;
											}
										});
										if (match < (matches.length - 1)) {
											pe.focus(matches.eq(match + 1));
											return false;
										}
									}
									pe.focus(matches.eq(0));
								}
								return false;
							}
						}
					}
				} else if (e.type === "close") {
					pe.focus(_activemenu.find(".knav-" + _id[1] + "-0-0"));
					setTimeout(function () {
						return hideallsubmenus();
					}, 5);
				} else if (e.type === "section-previous") {
					level = !!_id[2] << 1 | !!_id[3];
					switch (level) {
					case 0: // top-level menu link has focus
					case 1: // 3rd level menu link has focus, but the popup menu doesn't have sub-sections
						next = $scope.find(".knav-" + (_id[1] - 1) + "-0-0");
						if (next.length > 0) {
							pe.focus(next);
						} else {
							pe.focus($scope.find('ul.mb-menu > li:last').find('a:eq(0)')); // wrap around at the top level
						}
						break;
					case 2: // sub-section link has focus
					case 3: // 3rd level link (child of a sub-section) has focus
						next = _activemenu.find(".knav-" + (_id[1]) + "-" + (_id[2] - 1) + "-0");
						if (next.length > 0 && _id[2] > 1) {
							pe.focus(next);
						} else {
							next = $scope.find(".knav-" + (_id[1] - 1) + "-0-0"); // wrap around at the sub-section level
							if (next.length > 0) {
								pe.focus(next);
							} else {
								pe.focus($scope.find('ul.mb-menu > li:last').find('a:eq(0)')); // wrap around at the top level
							}
						}
						break;
					}
				} else if (e.type === "section-next") {
					level = !!_id[2] << 1 | !!_id[3];
					switch (level) {
					case 0: // top-level menu link has focus
					case 1: // 3rd level menu link has focus, but the popup menu doesn't have sub-sections
						next = $scope.find(".knav-" + (_id[1] + 1) + "-0-0");
						if (next.length > 0) {
							pe.focus(next);
						} else {
							pe.focus($scope.find(".knav-0-0-0")); // wrap around at the top level
						}
						break;
					case 2: // sub-section link has focus
					case 3: // 3rd level link (child of a sub-section) has focus
						next = _activemenu.find(".knav-" + (_id[1]) + "-" + (_id[2] + 1) + "-0");
						if (next.length > 0) {
							pe.focus(next);
						} else {
							next = $scope.find(".knav-" + (_id[1] + 1) + "-0-0"); // wrap around at the sub-section level
							if (next.length > 0) {
								pe.focus(next);
							} else {
								pe.focus($scope.find(".knav-0-0-0")); // wrap around at the top level
							}
						}
						break;
					}
				} else if (e.type === "item-next") {
					next = _activemenu.find(".knav-" + _id[1] + "-" + (_id[2]) + "-" + (_id[3] + 1)); // move to next item
					if (next.length > 0) {
						pe.focus(next);
					} else {
						next = _activemenu.find(".knav-" + _id[1] + "-" + (_id[2] + 1) + "-0"); // move to next section
						if (next.length > 0) {
							pe.focus(next);
						} else {
							pe.focus(_activemenu.find(".knav-" + _id[1] + "-1-0, .knav-" + _id[1] + "-0-1,")); // move to first item in the submenu
						}
					}
				} else if (e.type === "item-previous") {
					next = ((_id[2] > 0 || _id[3] > 1) ? _activemenu.find(".knav-" + _id[1] + "-" + (_id[2]) + "-" + (_id[3] - 1)) : ''); // move to previous item
					if ((_id[2] > 0 || _id[3] > 1) && next.length > 0) {
						pe.focus(next);
					} else {
						next = ((_id[2] > 1 || _id[3] > 0) ? _activemenu.find("[class*='knav-" + _id[1] + "-" + (_id[2] - 1) + "-']").last() : ''); // move to last item of the previous section
						if ((_id[2] > 1 || _id[3] > 0) && next.length > 0) {
							pe.focus(next);
						} else {
							pe.focus(_activemenu.find("[class*='knav-']").last()); // move to last item in the submenu
						}
					}
				} else if (e.type === "focusin" && _id[2] === 0 && _id[3] === 0) {
					hideallsubmenus();
					if (_elm.find('.expandicon').length > 0) {
						showsubmenu(e.target);
					}
					return;
				}
			}