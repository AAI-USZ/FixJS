function(){
	
	'use strict';
	
	var eventid = 7; /* Must be set */
	var limit = 10; /* How many items to get */
	var delay = 5000; /* How often we fetch in milliseconds */
	var nodes_max = 1000; /* maximum number of nodes in DOM */
	var /* the freshest reult we have */
		sinceTimePhoto = 0,
		sinceTimeText = 0;
	var /* the oldest reult we have */
		firstTimePhoto = 0,
		firstTimeText = 0;
	var more_fetch_num = 0; /* how many times we fetched older data */
	var calling = false; /* makes sure only one getJSON runs at a time */
	var container; /* where to put content */
	var api_url = 'http://api.gignal.com/event/api/eventId/';
	var date_re = /(\d+)/g;
	var re_links = /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig;
	
	function sortByDate (a, b) {
		return a.saved_on - b.saved_on;
	}
	
	function push (box, prepend) {
		if (prepend) {
			container.prepend(box).masonry('reload');
		} else {
			container.append(box).masonry('reload');
		}
	}
	
	function fetch (prepend) {
		if (calling) {
			return;
		}
		calling = true;
		var url = api_url + eventid + '?callback=?';
		if (prepend) {
			var options = {
				limit: limit,
				sinceTimePhoto: sinceTimePhoto,
				sinceTimeText: sinceTimeText
			};
		} else {
			more_fetch_num++;
			var offset = more_fetch_num * limit;
			var options = {
				limit: (limit / 2),
				sinceTimePhoto: firstTimePhoto,
				sinceTimeText: firstTimeText,
				offset: offset
			};
		}
		try {
			var jqxhr = jQuery.getJSON(url, options, function (data) {
				calling = false;
				if (data.text.length === 0 && data.photos.length === 0) {
					return;
				}
				function f() {
					// sort
					nodes.sort(sortByDate);
					// insert
					for (var i = 0; i < nodes.length; i++) {
						var node = nodes[i];
						switch (node.type) {
							case 'photo':
								push(templates.frame_image.render(node), prepend);
								break;
							case 'text':
								push(templates.frame_post.render(node), prepend);
								break;
						}
					}
					// remove > nodes_max from Masonry instance and the DOM.
					container.masonry('remove', $('#nodes .gig-outerbox:gt(' + (nodes_max - 1) + ')'));
				};
				var nodes = [];
				var loading_images = 0;
				(function (callback) { // photos
					if (!data.photos) {
						return callback();
					}
					$.each(data.photos, function(key, node){
						if (node.thumb_photo === null) {
							return callback();
						}
						if (sinceTimePhoto < node.saved_on) {
							sinceTimePhoto = node.saved_on;
						}
						if (firstTimePhoto > node.saved_on || firstTimePhoto === 0) {
							firstTimePhoto = node.saved_on;
						}
						// preload then insert
						var img = document.createElement('img');
						img.src = node.thumb_photo;
						loading_images++;
						img.onload = function(){
							node.type = 'photo';
							node.profilelink = 'http://' + node.service + '.com/';
							node.profilelink += (node.username.length) ? node.username : node.user_id;
							nodes.push(node);
							loading_images--;
							if (loading_images == 0) {
								callback();
							}
						};
						img.onerror = img.onabort = function() {
							loading_images--;
							if (loading_images == 0) {
								callback();
							}
						};
					});
					callback();
				}(f));
				(function (callback) { // text
					if (!data.text) {
						return callback();
					}
					$.each(data.text, function (key, node) {
						if (sinceTimeText < node.saved_on) {
							sinceTimeText = node.saved_on;
						}
						if (firstTimeText > node.saved_on || firstTimeText === 0) {
							firstTimeText = node.saved_on;
						}
						node.orange = (node.username === 'orangefeeling') ? 'orangefeeling' : '';
						node.type = 'text';
						node.profilelink = 'http://' + node.service + '.com/';
						node.profilelink += (node.username.length) ? node.username : node.user_id;
						node.text = node.text.replace(re_links, '<a href="$1" target="_top" class="nodelink">link</a>');
						nodes.push(node);
					});
					callback();
				}(f));
			});
			jqxhr.error(function(e){
				calling = false;
			});
		} catch (e) {
			calling = false;
		}
	}
	
	function Gignal_more () {
		var bottom = $('#nodes').height();
		$('html, body').animate({ scrollTop: bottom }, 2000);
		fetch(false);
	}
	
	/* OnLoad */
	jQuery(document).ready(function($){
		jQuery.ajaxSetup({
			jsonpCallback: 'callme',
			cache: false,
			timeout: 5000
		});
		// init 
		container = $('#nodes');
		// Masonry options
		container.masonry({
			itemSelector: '.gig-outerbox',
			isAnimated: true,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});
		// get data now
		fetch();
		// get data every {delay} millisecond
		window.setInterval(fetch, delay, true);
		// load more
		$(document).on('click', '.gig-morebtn', function(){
			Gignal_more();
		});
		// modal click event
		$(document).on('click', '.modal', function (e) {
			e.preventDefault();
			$(new Image()).attr('src', $(this).attr('href')).modal({
				autoResize: true,
				position: ['3%'],
				minWidth: 400,
				maxWidth: 415,
				maxHeight: 500,
				overlayClose: true
			});
		});
	});

}