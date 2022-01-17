function (index) {
						var $this = $(this);
						// If the menu item is a heading
						if ($this.is('h' + hlevel)) {
							hlink = $this.children('a');
							subsection = $('<div data-role="collapsible"' + (hlink.hasClass('nav-current') ? " data-collapsed=\"false\"" : "") + '><h' + hlevel + '>' + $this.text() + '</h' + hlevel + '></div>');
							// If the original menu item was in a menu bar
							if (menubar) {
								$this = $this.parent().find('a').eq(1).closest('ul, div, h' + hlevel + 1).first();
								next = $this;
							} else {
								next = $this.next();
							}

							if (next.is('ul')) {
								// The original menu item was not in a menu bar
								if (!menubar) {
									next.prepend($('<li></li>').append($this.children('a').html(hlink.html() + ' - ' + pe.dic.get('%home'))));
								}
								nested = next.find('li ul');
								// If a nested list is detected
								nested.each(function (index) {
									var $this = $(this);
									hlink = $this.prev('a');
									if ((hlevel + 1 + index) < 7) {
										// Make the nested list into a collapsible section
										$this.attr('data-role', 'listview').attr('data-theme', theme).wrap('<div data-role="collapsible"></div>');
										$this.parent().prepend('<h' + (hlevel + 1 + index) + '>' + hlink.html() + '</h' + (hlevel + 1 + index) + '>');
										$this.prepend('<li><a href="' + hlink.attr('href') + '">' + hlink.html() + ' - ' + pe.dic.get('%home') + '</a></li>');
										hlink.remove();
									} else {
										$this.attr('data-role', 'listview').attr('data-theme', theme);
									}
								});
								subsection.append($('<ul data-role="listview" data-theme="' + theme + '"></ul>').append(next.children('li')));
								subsection.find('ul').wrap('<div data-role="controlgroup">' + (nested.length > 0 ? "<div data-role=\"collapsible-set\" data-theme=\"" + theme + "\"></div>" : "") + '</div>');
							} else {
								// If the section contains sub-sections
								subsection.append(pe.buildmenu($this.parent(), hlevel + 1, theme, false));
								// If the original menu item was not in a menu bar
								if (!menubar) {
									subsection.find('div[data-role="collapsible-set"]').eq(0).prepend($this.children('a').html(hlink.html() + ' - ' + pe.dic.get('%home')).attr('data-role', 'button').attr('data-theme', theme).attr('data-icon', 'arrow-r').attr('data-iconpos', 'right'));
								}
							}
							menu.append(subsection);
						} else if ($this.is('div')) { // If the menu item is a div
							menu.append($this.children('a').attr('data-role', 'button').attr('data-theme', theme).attr('data-icon', 'arrow-r').attr('data-iconpos', 'right'));
						}
					}