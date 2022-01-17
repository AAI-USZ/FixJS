function($) {

	

	/**

	 * Determines if the current track is still in view.

	 */

	function isInView(elem, up)

	{

		if (!elem && elem.length == 0) return false;

		var margin = 60;

		var top = $('#topbar').height() + margin;

		var bottom = $('#center').height() + top - margin*2;

		

		if (up)

			return elem.offset().top > top;

		else

			return (elem.offset().top + elem.height()) < bottom;

	}

	/**

	 * Scrolls the center panel to the track.

	 */

	function scrollTo(elem) {

		$('#center').scrollTop(elem.position().top);

		return elem;

	}

	

	/**

	 * Select tracks. Multiple tracks can be selected by shift clicking.

	 */

	$(document).on('click', '.track', function(e) {

		var current = $('.current');



		if (e.ctrlKey || e.metaKey) {

			$(this).toggleClass('selected');

		} else if (e.shiftKey && current.length != 0) {

			var clicked = $(this);

			if (current.position().top > clicked.position().top) {

			    var c = current;

			    current = clicked;

			    clicked = c;

			}

			current.nextUntil(clicked).add(current).add(clicked).addClass('selected');

		} else {

			$('.selected').removeClass('selected');

			$(this).addClass('selected');

		}

		$('.current').removeClass('current');

		$(this).addClass('current');

		blurText();

	});

	

	/**

	 * Navigating through the tracks.

	 */

	key('up, down', function(e) {

		var dontScroll = false;

	    var selected = $('.selected').removeClass('selected').filter('.current');

	    var prev;

	    if (e.which == 38)

			prev = selected.prev('.track');

		else

			prev = selected.next('.track');

	    

	    if (prev.length == 0) {

	    	prev = scrollTo($('tr.track:' + (e.which == 38 ? 'last' : 'first')));

	    	dontScroll = true;

	    }

	    $('.current').removeClass('current');

	    prev.addClass('selected').addClass('current');

	    return !dontScroll && !isInView(selected, e.which == 38);

	});

	/**

	 * Altering selection

	 */

	key('shift+up, shift+down', function(e) {

		var current = $('.current').removeClass('current');

		var prev;

		if (e.which == 38)

			prev = current.prev();

		else

			prev = current.next();

		

		if (prev.is('.selected')) {

		    current.removeClass('selected').removeClass('.current');

		    prev.addClass('current');

		} else {

		    current.removeClass('current');

		    prev.addClass('current').addClass('selected');

		}

		blurText();

	});

	

	/**

	 * Add a track to the queue.

	 */

	key('enter', function() {

		$('.selected').dblclick();

	});

	/**

	 * Focus and select the text in the search popup.

	 */

	key('ctrl+s', function() {

		$('input.search').focus().get(0).select();

		return false;

	});

	/**

	 * Remove a track from the queue.

	 */

	key('delete, backspace', function() {

		$('.playingTable .selected').each(function() {

			$.get('Play', {'delete': true, 'id': $(this).data('id')});

		});

		return false;

	});

	/** Prev */

	key('ctrl+,', function() {

		$('#back').click();

		return false;

	});

	/** Next */

	key('ctrl+.', function() {

		$('#skip').click();

		return false;

	});

	/** Pause/play */

	key('ctrl+/', function() {

		$('#playpause').click();

		return false;

	});

	/** Volume */

	key('ctrl+up,ctrl+down', function(e) {

		var change = e.which == 38 ? 1 : -1;

		Volume.setVolume(Math.max(0, Math.min(100, Volume.getVolume() + change)));

		return false;

	});

	

	/**

	 * Global function for blurring text (after shift clicking).

	 */

	window.blurText = function() {

		if (document.selection) {

            document.selection.empty();

        } else {

            window.getSelection().removeAllRanges();

        }

	};

}