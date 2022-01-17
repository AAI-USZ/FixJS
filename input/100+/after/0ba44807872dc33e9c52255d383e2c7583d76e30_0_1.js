function domReady() {
	document.onkeydown = keypress;
	truncatePosts();
	checkhighlight();
	addpreviewevents();
	showNotifications();

	if (kumod_set = checkMod()) {
		var modscript = document.createElement('script');
		modscript.type = 'text/javascript';
		modscript.src = ku_cgipath + '/manage_page.php?action=modboardpagejs';
		$$('head')[0].appendChild(modscript);
	}

	var frontPage = document.location.pathname.match(/\/chan[^\/]*\/($|\?)/);
	jQuery('#verytopbar').add('.adminbar').addClass('darkbar');  // while template changes propogate
	if (!frontPage) {
		pinNavBar();
		set_inputs('postform');
		set_delpass('delform');
	}

	var hideNamesCheck = $('setting-hidenames');
	if (hideNamesCheck)
		hideNamesCheck.onclick = function () {
			$('setting-hidenamesshowhover').disabled = !hideNamesCheck.checked;
		};

	if (getCookie('hidenames') & 1) {
		$$('.postername').each(function (name) {
			if (name.parentNode.getElementsBySelector('.mod,.admin').length)
				return;
			var tripNode = name.parentNode.getElementsBySelector('.postertrip');
			var trip = tripNode.length ? ' ' + tripNode[0].innerHTML : '';
			var fullName = name.innerHTML + trip;
			if (tripNode.length)
				tripNode[0].innerHTML = '';
			if (getCookie('hidenames') & 2) {
				name.innerHTML = '<a>Anonpony</a>';
				name.title = fullName;
			} else
				name.innerHTML = 'Anonpony';
		});
	}
	var tzServer = -7;
	try {
		tzServer = getServerTimezone();
	} catch(ex) {}
	try {
		var timezone = parseInt(Date.today().setTimeToNow().getUTCOffset(),10)/100.0;
		var timeFormat = 'ddd, MMM d, yyyy ' + (getCookie('twelvehour') !== '0' ? 'h:mm tt' : 'H:mm');
		$$('.posttime').each(function (span) {
			span.innerHTML = Date.parse(span.innerHTML).addHours(timezone - tzServer)
				.toString(timeFormat).replace(/([AP]M)$/, '<span style="font-size:0.75em">$1</span>');
		});
	} catch(ex) {}

	if (getCookie('unspoilall') === '1') {
		var spoilers = $$('.spoiler');
		for (var s = 0; s < spoilers.length; ++s) {
			spoilers[s].className += ' spoiler-hover';
			spoilers[s].onmouseover = spoilers[s].onmouseout = '';
		}
	}

	$$('.rd').each(function (rd) {
		new Rainbow(rd,224,true,100,-20);
	});

	$$('.ov').each(function (octavia) {
		var note = document.createElement('span');
		note.style.position = 'absolute';
		octavia.appendChild(note);

		var waiting = false, xVel = 0, yVel = 0;

		var reset = function () {
			note.innerHTML = ['&#9834;', '&#9835;'][Math.floor(Math.random() * 2)];
			var origin = Position.cumulativeOffset(octavia);
			xVel = Math.floor(Math.random() * 3) - 1;
			note.style.left = origin[0] + Element.getWidth(octavia) - Element.getWidth(note) / 2 + 'px';
			note.style.top = origin[1] - Element.getHeight(note) / 2 + 'px';
			note.style.opacity = 1.0;
		};

		var move = function () {
			note.style.left = parseInt(note.style.left, 10) + xVel - 2 + Math.floor(Math.random() * 5) + 'px';
			note.style.top = parseInt(note.style.top, 10) + yVel - 2 - Math.floor(Math.random() * 2) + 'px';
			var opac = note.style.opacity - 0.04 - Math.random() * 0.07;
			if (opac < 0.02)
				opac = 0;  // Prevent rounding bugs
			note.style.opacity = Math.max(note.style.opacity - 0.07, 0);
			if (note.style.opacity == 0 && !waiting)
				delay();
		};

		var delay = function () {
			waiting = true;
			window.setTimeout(function () {
				waiting = false;
				reset();
			}, Math.floor(Math.pow(Math.random(), 2.5) * 3000));
		};

		window.setInterval(move, 30);
		delay();
	});

	$$('.postertrip').each(function (span) {
		if (span.innerHTML === '!!PinkiePie') {
			span.innerHTML = '<img src="/chan/css/images/pinkie-cutie-sm.png" alt="!!" width=12 height=20 style="position:relative;top:3px"><span style="color:#e4a">PinkiePie</span>';
		}
		if (span.innerHTML === '!!Rarity') {
			span.innerHTML = '<img src="/chan/css/images/rock-sm.png" alt="!!" width=15 height=20 style="vertical-align:top">Rarity';
		}
	});

	var sitesidebar = $('sitesidebar');
	if (sitesidebar) {
		Position.absolutize(sitesidebar);
		var abstop = parseInt(sitesidebar.style.top, 10);
		var fixtop = 8;
		window.onscroll = function (e) {
			if (window.scrollY > abstop - fixtop) {
				sitesidebar.style.position = 'fixed';
				sitesidebar.style.top = fixtop + 'px';
			} else {
				sitesidebar.style.position = 'absolute';
				sitesidebar.style.top = abstop + 'px';
			}
		};
	}

	jQuery('body').delegate('.postreportlink', 'click', function (e) {
		var $target = jQuery(e.target),
			reply = $target.closest('.reply'),
			thread = $target.closest('.thread'),
			threadMatch = /^thread(\d+)(.+)$/.exec(thread[0].id),
			boardName = threadMatch[2],
			postID = reply.length ? reply[0].id.substring(5) : threadMatch[1],
			popup = jQuery('<div class="reflinkpreview" style="display:none"><form>' +
				'<input type=hidden name=board value="' + boardName + '">' +
				'<input type=hidden name="post[]" value="' + postID + '">' +
				'<input type=hidden name="reportpost" value="yourmother">' +
				'<label>Reason: <input name=reportreason style="width:95%"></label><br>' +
				'<input type=submit value="Send report">' +
				'<a href="#" class=cancellink style="display:block;float:right">Cancel</a>' +
			'</form></div>').appendTo(document.body);

		popup.css({
			position: 'absolute',
			padding: '0.5em',
			width: '20em',
			minWidth: '20em',
		}).css({
			left: (reply.length ? reply : thread).offset().left + (reply.length ? reply : thread).outerWidth() - popup.outerWidth(),
			top: $target.offset().top + $target.outerHeight() - popup.outerHeight()
		});
		popup.find('.cancellink').css({position: 'absolute', right: '0.2em', bottom: 0, fontSize: '0.8em'}).click(function (e) {
			popup.fadeOut(200, function () {
				popup.remove();
			});
			e.preventDefault();
		});
		popup.find('form').submit(function (e) {
			var submit = popup.find('input[type=submit]').prop('disabled', true).val('Sending...');
			jQuery.ajax({
				url: ku_cgipath + '/board.php',
				type: 'post',
				data: popup.find('form').serialize(),
				success: function (data) {
					popup.text(data.slice(0, data.indexOf("<")));
					setTimeout(function () {
						popup.fadeOut(100, function () {
							popup.remove();
						});
					}, 1500);
				},
				error: function () {
					submit.prop('disabled', false).val('Report failed. Try again?');
				}
			});
			e.preventDefault();
		});
		document.body.appendChild(popup[0]);
		popup.fadeIn(100, function () {
			popup.find('[name=reportreason]').focus();
		});

		e.preventDefault();
	});

	var reportbutton = $$('#delform [name=reportpost]')[0]
	if(reportbutton) {
		reportbutton.onclick = function (e) {
			var reason = $$('#delform [name=reportreason]')[0];
			if (!reason.value) {
				reason.focus();
				var oldbg = reason.style.backgroundColor;
				reason.style.backgroundColor = '#fab';
				window.setTimeout(function () {
					reason.style.backgroundColor = oldbg;
				}, 1000);
				e.preventDefault();
			}
		};
	}
}