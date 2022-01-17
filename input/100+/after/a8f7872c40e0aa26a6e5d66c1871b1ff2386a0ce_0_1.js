function renderResults(results, didyoumean) {
		var template = templates.getTemplate('search-results-template');
		if(results.length > 0) {
			var searchParam = results[0];
			var searchResults = results[1].map(function(title) {
				return {
					key: app.urlForTitle(title),
					title: title
				};
			});
			if(didyoumean) {
				var didyoumean_link = {
					key: app.urlForTitle(results[0]),
					title: results[0]
				};
				$("#resultList").html(template.render({'pages': searchResults, 'didyoumean': didyoumean_link}));
			} else {
				$("#resultList").html(template.render({'pages': searchResults}));
			}
			$("#resultList .searchItem").click(onSearchResultClicked);
		}
		$("#doFullSearch").click(onDoFullSearch);
		$("#resultList .searchItem").bind('touchstart', function() {
			$("#searchParam").blur();
		});
		chrome.hideSpinner();
		chrome.hideOverlays();
		$('#searchresults').localize().show();
		if(!chrome.isTwoColumnView()) {
			$("#content").hide(); // Not chrome.hideContent() since we want the header
		} else {
			$("html").addClass('overlay-open');
		}
		chrome.setupScrolling('#searchresults .scroller');
		// see http://forrst.com/posts/iOS_scrolling_issue_solved-rgX
		// Fix for bug causing page to not scroll in iOS 5.x when visited from nearby
		chrome.scrollTo("#searchresults .scroller", 0);
	}