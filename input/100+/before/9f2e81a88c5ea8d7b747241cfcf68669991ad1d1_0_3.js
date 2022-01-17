function () { // WRAPPER TO PREVENT GLOBALS
"use strict";

// Unescape automatically escaped data in code samples. It's better
// to do this client-side to avoid parsing the DOM server-side.
$('article.comment .body pre code').each(function () {
	this.innerHTML = this.innerHTML.replace(/&quot;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');
});

$('input[name="email"]').tipsy({
	fade: true,
	gravity: 'w',
	trigger: 'focus'
});

$('.nojs').removeClass('nojs').addClass('js');

/**
 * Handles the contact and comment post forms, both of which are
 * extremely similar - this is DRYer.
 *
 * @param string url The URL to send the data to.
 * @param function callback Well... a callback to be called.
 */
function genericFormHandler(url, callback) {
	return function () {
		var $this = $(this),
			error = false;

		$this.find('.error').hide();

		if (!this.name.value) {
			$this.find('#nameerror')
				.text('Please specify a name')
				.show();
			error = true;
		}
		if (!this.email.value) {
			$this.find('#emailerror')
				.text('Please specify an email address')
				.show();
			error = true;
		}
		if (!this.text.value) {
			$this.find('#texterror')
				.text('Please enter a message')
				.show();
			error = true;
		}

		if (!error) {
			$.post(url, $this.serialize(), function (body) {
				callback.call($this, body);
			});
		}

		return false;
	};
}

// Handle contact form submit
$('#contact').submit(genericFormHandler('contact', function (body) {
	this.find('#texterror').text(body).show();
}));

// Handle comment form submit
var commentPost = $('#comment_post')[0],
	newComment, url;

if (commentPost) {
	url = commentPost.action + '/comment/' + commentPost.slug.value;
	$('#comment_post').submit(genericFormHandler(url, function (body) {
		if (typeof body === 'object') {
			newComment = $('#newcomment');
			newComment.find('.author strong').text(body.author);
			newComment.find('time').text(body.date);
			newComment.find('.body').html(body.text);
			newComment.show();
			this.hide();
			$('.nocomments').hide();
		} else {
			this.find('#texterror').text('Error: ' + body).show();
		}
	}));
}


// Tabs in textarea
$('textarea').keydown(function (e) {
	var start, end, nl, value,
		tabs = 0;

	if (e.keyCode === 9) {
		e.preventDefault();
		start = this.selectionStart;
		nl = end = this.selectionEnd;
		if (e.shiftKey) {
			// If shift key pressed, remove tabs from beginning of lines
			while (true) {
				value = this.value;
				nl = value.lastIndexOf('\n', nl - 2) + 1;
				if (value.slice(nl, nl + 1) === '\t') {
					tabs += 1;
					this.value = value.slice(0, nl) + value.slice(nl + 1);
				}
				if (nl <= start) {
					this.selectionStart = start - 1;
					this.selectionEnd = end - tabs;
					break;
				}
			}
		} else if (start === end) {
			// If no selection, insert tab
			value = this.value;
			this.value = value.slice(0, start) + '\t' + value.slice(start);
			this.selectionStart = this.selectionEnd = end + 1;
		} else {
			// If selection, insert tab at beginning of every line
			while (true) {
				value = this.value;
				tabs += 1;
				nl = value.lastIndexOf('\n', nl - 2) + 1;
				this.value = value.slice(0, nl) + '\t' + value.slice(nl);
				if (nl <= start) {
					this.selectionStart = start + 1;
					this.selectionEnd = end + tabs;
					break;
				}
			}
		}
	}
});

// MD cheatsheet
$(document).keydown(function (e) {
	var cheatsheet = $('#markdowncheat');
	if (e.keyCode === 77 && !$(':focus').length) {
		if (cheatsheet.is(':hidden')) {
			$('.markdown').show();
			$('.parsedmarkdown').hide();
			cheatsheet.fadeIn(200);
		} else {
			cheatsheet.click();
		}
		e.preventDefault();
	} else if (e.keyCode === 27 && cheatsheet.is(':visible')) {
		cheatsheet.click();
	} else if (e.keyCode === 84 && cheatsheet.is(':visible')) {
		$('#markdowncheat .toggle').click();
	}
});

$('#markdowncheat .toggle').click(function (e) {
	e.preventDefault();

	$('.markdown, .parsedmarkdown').slideToggle();
});

$('#markdowncheat, #markdowncheat .close').click(function () {
	$('#markdowncheat').fadeOut(200);
	return false;
}).children('div').click(function (e) {
	e.stopPropagation();
});


// Tag mouseovers
var tags = {};
$('.tags, .more').on('mouseover', 'a', function () {
	var $this = $(this);

	if ($this.data('titled')) {
		$this.tipsy('show');
	} else if (tags[$this.text()]) {
		$this.attr('title', tags[$this.text()])
			.data('titled', true)
			.tipsy('show');
	} else {
		$.get($(this).attr('href'), function (title) {
			title += ' article' + (title === 1 ? '' : 's');
			tags[$this.text()] = title;
			$this.attr('title', title)
				.data('titled', true)
				.tipsy('show');
		});
	}
}).on('mouseout', 'a', function () {
	$(this).tipsy('hide');
}).children('a').tipsy({
	fade: true,
	gravity: 's',
	trigger: 'manual'
});


var pageFocused = true;
$(window).focus(function () {
	pageFocused = true;
}).blur(function () {
	pageFocused = false;
});


// Check for and handle new articles
if ($('.articles').length) {
	var articles = [],
		time = Date.now(),
		link = $('.newarticle'),
		refreshInterval = 30000;

	// Check for new articles (every 30 seconds, by default)
	setInterval(function () {
		if (!pageFocused) {
			return;
		}

		// Timestamp needs / 1000 as it is in ns, while server wants ms
		var data = {timestamp: Math.round(time / 1000)};

		$.get(location.pathname, data, function (newArticles) {
			// newArticles can equal "Invalid time", check for that
			if ($.isArray(newArticles) && newArticles.length) {
				articles = articles.concat(newArticles);

				link.find('p')
					.text(articles.length + ' new articles available');

				if (link.is(':hidden')) {
					link.slideDown();
				}
			}

			time = Date.now();
		});
	}, refreshInterval);

	// Handle "x new articles available" thingy being clicked
	link.click(function () {
		var a, i, footer, header, newArticle, tag, tags;
		for (i = 0; i < articles.length; i++) {
			// Generate new article
			newArticle = $('<article class="articles"></article>');

			header = $('<header></header>').appendTo(newArticle);

			a = $('<a></a>').appendTo(header)
				.attr('href', articles[i].href)
				.html('<h2>' + articles[i].title + '</h2>');

			$('<time></time>').appendTo(header)
				.addClass('articletime')
				.attr('datetime', articles[i].date[0])
				.text(articles[i].date[1]);

			$('<div></div>').appendTo(newArticle)
				.addClass('body')
				.html(articles[i].summary + ' ')
				.append('<a>Read more</a>')
				.children('a:last-child')
				.addClass('readmore')
				.attr('href', articles[i].href);

			footer = $('<footer></footer>').appendTo(newArticle);
			$('<a></a>').appendTo(footer)
				.addClass('comments')
				.attr('href', articles[i].href + '#comments')
				.text('0 comments'); // Assume zero comments

			tags = $('<div></div>').appendTo(footer)
				.addClass('tags index')
				.text('Tags:');

			for (tag in articles[i].tags) {
				if (articles[i].tags.hasOwnProperty(tag)) {
					tags.append(' <a></a>')
						.children('a:last-child')
						.attr('href', articles[i].tags[tag])
						.text(tag);
				}
			}

			newArticle.insertAfter(link);
		}

		articles = [];
		link.slideUp();
	});
}


// Check for new comments
if ($('section.comments').length) {
	var commentsTime = Date.now();
	setInterval(function () {
		if (!pageFocused) {
			return;
		}

		var i, newComment,
			data = {timestamp: Math.round(commentsTime / 1000)};

		$.get(location.pathname, data, function (comments) {
			if ($.isArray(comments) && comments.length) {
				for (i = 0; i < comments.length; i++) {
					newComment = $('#newcomment').clone()
						.insertBefore('#comment_post')
						.slideDown();

					if (comments[i].website) {
						newComment.find('.author strong')
							.html('<a></a>')
							.find('a')
							.attr('href', comments[i].website)
							.text(comments[i].author);
					} else {
						newComment.find('.author strong')
							.text(comments[i].author);
					}

					newComment.find('time').text(comments[i].date);
					newComment.find('.body').html(comments[i].text);
				}

				$('.nocomments').hide();
			}

			commentsTime = Date.now();
		});
	}, 15000);
}


// Search
$('#search').keyup(function (e) {
	if (!$('.articles').length) {
		return; // Not on a listing
	}

	var $this = $(this),
		change = false,
		val = $this.val();

	if (e.keyCode === 27) {
		// Escape has been pressed; clear input and blur
		$this.val('').keyup().blur();
	}

	if ((!getHash('search') && !val) || getHash('search') === val) {
		return;
	}

	changeHash('search', val);

	$('.articles:not(.js, .author, .noarticles)').each(function () {
		var $this = $(this),
			text;

		text = $this.find('h2').text() +
			$this.find('.body').text().slice(0, -12) +
			$this.find('.tags').text().slice(11);

		$this.removeHighlight();

		if (text.toLowerCase().indexOf(val.toLowerCase()) === -1) {
			if ($this.is(':visible')) {
				change = true;
			}
			$this.addClass('hidden');
		} else {
			if (!$this.is(':visible')) {
				change = true;
			}
			$this.highlight(val || 'qpwoei').removeClass('hidden');
		}
	});

	if (change) {
		refreshPages();
	}

	if (!$('.articles:not(.js, .author, .noarticles):visible').length) {
		$('.noarticles').show();
	} else {
		$('.noarticles').hide();
	}
});


// Various keydown functions
$(document).keydown(function (e) {

	// meta+f to search
	if (e.keyCode === 70 && e.metaKey && $('.articles').length) {
		var $search = $('#search');

		if (!$search.is(':focus')) {
			$search.focus();

			// Display tooltip only once
			if (!$search.data('tipsy').$tip) {
				$search.tipsy('show');

				setTimeout(function () {
					$search.tipsy('hide');
				}, 3000);
			}
			e.preventDefault();
		}

	// Left to page left
	} else if (e.keyCode === 37) {
		$('.jp-previous').click();

	// Right to page right
	} else if (e.keyCode === 39) {
		$('.jp-next').click();

	// Numbers to page number
	} else if (e.keyCode > 48 && e.keyCode < 58 && $('.articles').length) {
		$('.holder').jPages(e.keyCode - 48);
	}
});

$('#search').tipsy({
	gravity: 's',
	fade: true,
	trigger: 'manual'
});

/**
 * Gets data from hash using given key.
 *
 * @param string key The key to use.
 * @return string The data from the URL or false.
 */
function getHash(key) {
	var hash = location.hash.slice(1).split('&'),
		end = false;

	$.each(hash, function (index, value) {
		value = value.split('=');

		if (value[0] === key) {
			end = decodeURIComponent(value[1]);
		}
	});

	return end;
}

/**
 * Function is in a closure. Changes data in hash by given key to given value.
 *
 * @param string key The key to use.
 * @param string value The value to store.
 */
var changeHash = (function () {

	// Callbacks to be called when hash changes.
	var hashchangeCallbacks = {
		search: function (search) {
			if ($('#search').val() !== search) {
				$('#search').val(search).keyup();
			}
		},
		page: function (page) {
			if (currentPage !== page) {
				$('.holder').jPages(Number(page));
			}
		}
	};

	// When hash changes
	window.onhashchange = function () {
		var hash = location.hash.slice(1).split('&');
		$.each(hash, function (index, value) {
			value = value.split('=');
			value[1] = decodeURIComponent(value[1]);

			if (hashchangeCallbacks[value[0]]) {
				hashchangeCallbacks[value[0]].call(null, value[1]);
			}
		});
	};

	$(window.onhashchange); // Run all on page load

	// See docblock at start of closure.
	return function (key, value) {
		var currentHash = location.hash.slice(1).split('&'),
			done = false, newHash, seperator;

		key = encodeURIComponent(key);
		value = encodeURIComponent(value);

		$.each(currentHash, function (index, val) {
			var find, replace;

			val = val.split('=');
			if (val[0] === key) {
				find = key + '=' + val[1] + '&';
				replace = value ? key + '=' + value + '&' : '';
				newHash = location.hash.replace(find, replace);

				if (newHash === location.hash) {
					find = '&' + key + '=' + val[1];
					replace = value ? '&' + key + '=' + value : '';
					newHash = newHash.replace(find, replace);

					if (newHash === location.hash) {
						find = key + '=' + val[1];
						replace = value ? key + '=' + value : '';
						newHash = newHash.replace(find, replace);
					}
				}

				done = true;
			}
		});

		if (!done) {
			value = value ? key + '=' + value : '';
			seperator = location.hash && value ? '&' : '';
			newHash = location.hash + seperator + value;
		}

		if (newHash === '' || newHash === '#') {
			try {
				history.pushState('', document.title, location.pathname);
			} catch(e) {
				location.hash = '#';
			}
		} else {
			location.hash = newHash;
		}
	};
})();

// Initiate pages
if ($('.articles').length) {
	refreshPages(false);
}

var currentPage = 1;

/**
 * "Refresh" the pages - destroy the old instance and create a new one. Should
 * be used whenever the data changes.
 *
 * @todo Stop the annoying blink.
 *
 * @param boolean destroy If false, will not destroy pages. Useful for
 *		initialising pages.
 */
function refreshPages(destroy) {
	if (typeof destroy !== 'boolean' || destroy) {
		$('.holder').jPages('destroy');
		changeHash('page', '');
	}

	$('.holder').jPages({
		containerID: 'jpagesarticles',
		fallback: 0,
		startPage: getHash('page') || 1,
		callback: function (pages) {
			currentPage = pages.current;
			changeHash('page', currentPage === 1 ? '' : currentPage);
		}
	});
}


// Fix sidebar in place
if ($('.articles').length) {
	var fixSidebar = true;

	$(window).scroll(function (e, widthChange) {
		if (!fixSidebar) {
			return;
		}

		var content, contentWidth,
			sidebar = $('#sidebar'),
			top = $(window).scrollTop();

		if (typeof widthChange !== 'boolean') {
			widthChange = false;
		}

		if (top > 100) {
			if (!sidebar.hasClass('sidebarfixed') || widthChange) {
				content = $('#content');
				contentWidth = parseInt(content.css('width'), 10);

				sidebar.addClass('sidebarfixed')
					.css('width', contentWidth / 3 - 11)
					.css('left', content.offset().left + contentWidth + 11);
			}
		} else {
			sidebar.removeClass('sidebarfixed');
		}
	}).resize(function () {
		$(this).trigger('scroll', true);
	}).trigger('scroll');

	$(document).on('touchstart', function () {
		fixSidebar = false;
		$('#sidebar').removeClass('sidebarfixed');
	});
}


}