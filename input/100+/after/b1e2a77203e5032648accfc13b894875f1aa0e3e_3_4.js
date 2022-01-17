function SearchView() {

	var core = new View();

	var enterCallBack = null;

	

	core.name = 'search';

	core.model = new EntryModel();



	core.supportedHashes = ["allposts"];

	

	core.onHashRequest = function (hashName, hashValue) {

		$("#allposts").click();

	};

	

	core.onEnterRegion = function (callback) {

		enterCallBack = callback;

		

		core.template2('entrySearch', function () {

			core.templates.entrySearch.apply(null, function (tplData) {

				$(core.region).hide().html('');

				$(tplData).appendTo($(core.region));

				

				$('<img src="resources/delete.png" '

					+ 'id="clearSearch" />')

						.appendTo('#search');

					

				$('#clearSearch').css({	

					position: "absolute", 

					display: "none"

				});

					

				core.adjustClearSearchPosition();

				

				$(core.region).fadeIn();

				setTimeout(

					core.adjustLensPosition,

					100);

				

				core.attachEventHandlers();

				if (enterCallBack) enterCallBack();

			});

		});

	};

	

	core.onLeaveRegion = function (callback) {

		core.detachEventHandlers();

		$(core.region).fadeOut('fast', callback);

	};

	

	core.onMessageReceived = function (message, callback) {

		if (message == 'HEADER_HIDDEN') {

			core.adjustLensPosition();

			core.adjustClearSearchPosition();

		}

		

		if (callback) callback();

	}

	

	core.loadComplete = function (data, textStatus, jqXHR) {

		$(core.region)

			.html(data)

			.hide()

			.fadeIn();

		

		core.adjustLensPosition();

		core.attachEventHandlers();

		if (enterCallBack) enterCallBack();

	};

	

	core.searchForText = function (text) {

		core.handlers.clearSearch(true);

		$('.searchItem').unbind('hover');

		$('#magnifyingLens').addClass('loading');

		$('#searchResults').fadeOut().html('');

		core.model.search(text, core.handlers.searchSuccess);

	};

	

	core.adjustClearSearchPosition = function () {

		$('#clearSearch').css('left', 

			$('#searchText').position().left 

				+ $('#searchText').outerWidth()

				- $('#clearSearch').width()

				-25

				+ 'px');

				

		$('#clearSearch').css('top', 

			$('#searchText').position().top 

				+ $('#searchText').outerHeight() 

				- $('#clearSearch').width() 

				-6

				+ 'px');

	};

	

	core.adjustLensPosition = function () {

		$('#magnifyingLens').css('left', 

			$('#searchText').position().left 

				+ $('#searchText').outerWidth()

				- $('#magnifyingLens').width()

				-3 

				+ 'px');

				

		$('#magnifyingLens').css('top', 

			$('#searchText').position().top 

				+ $('#searchText').outerHeight() 

				- $('#magnifyingLens').width() 

				-3 

				+ 'px');

	};

	

	core.attachEventHandlers = function () {

		$('#searchText')

			.bind('focus', core.handlers.searchTextFocus)

			.bind('blur', core.handlers.searchTextBlur)

			.bind('keyup', core.handlers.searchTextKeyUp);

			

		$("#allposts")

			.bind('click', core.handlers.allPostsClick);

		

		$("#clearSearch")

			.bind('click', core.handlers.clearSearch);

			

		$(window).bind('resize', function () {

			core.adjustClearSearchPosition();

			core.adjustLensPosition();

		});

	};

	

	core.detachEventHandlers = function () {

		$('#searchText')

			.unbind('focus')

			.unbind('blur')

			.unbind('keyup');

	};

	

	core.handlers = {

		searchTextFocus: function (evt) {

			if (evt.currentTarget.value=='Search this site...')

				evt.currentTarget.value = '';

				

			$(evt.currentTarget).removeClass('inactive');

		},

		

		searchTextBlur: function (evt) {

			if (evt.currentTarget.value == '') {	

				evt.currentTarget.value = 'Search this site...';

				$(evt.currentTarget).addClass('inactive');

			}

		},

		

		searchTextKeyUp: function (evt) {

			if (evt.currentTarget.value != '') {	

				$('#searchHint').fadeIn();

				$('#magnifyingLens').removeClass('inactive');

				$('#magnifyingLens').bind('click', 

					core.handlers.magnifyingLensClick);

			} else {

				$('#searchHint').fadeOut();

				$('#magnifyingLens').addClass('inactive');

				$('#magnifyingLens').unbind('click');

			}

			

			if (!$(evt.currentTarget).hasClass('inactive')

				&& evt.originalEvent 

				&& evt.originalEvent.keyCode == 13)

					core.searchForText(evt.currentTarget.value);

		},

		

		clearSearch: function(keepText) {

			$('#searchResults').fadeOut().html('');

			$('#searchHint').fadeOut();

			if (keepText !== true) $('#searchText').val('');

			$('#clearSearch').fadeOut();

		},

		

		searchSuccess: function(data, textStatus, jqXHR) {

			$('#magnifyingLens').removeClass('loading');

			

			var searchData = data;

			if (!searchData.length) return;

			

			core.template2('entrySearchResults', function () {

				core.templates.entrySearchResults.apply(searchData,

					function(tplData) {

						$(tplData).appendTo('#searchResults');

						$('#searchResults').fadeIn();					

						core.adjustClearSearchPosition();

						$('#clearSearch').fadeIn();				

						$('.searchItem').hover(

							core.handlers.searchItemIn,

							core.handlers.searchItemOut);

					});

			});

		},

		

		searchItemIn: function (evt) {

			$(evt.currentTarget).animate(

				{backgroundColor: '#333333'}, 'fast');

		},

		

		searchItemOut: function (evt) {

			$(evt.currentTarget).animate(

				{backgroundColor: '#06A8F9'}, 'fast');

		},

		

		magnifyingLensClick: function (evt) {

			core.searchForText($('#searchText').val());

			return false;

		},

		

		allPostsClick: function (evt) {

			evt.stopPropagation();

			$("#searchText").val("allposts").trigger("keyup");

			core.searchForText($("#searchText").val());

			return false;

		}

	};

	

	return core;

}