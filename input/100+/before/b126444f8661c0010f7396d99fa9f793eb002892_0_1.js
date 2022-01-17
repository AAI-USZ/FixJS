function() {
	$("#searchbar").smartkeywording();

	$("#searchbar").bind('smartkeywordingerror', function(e, data) {
		handleAjaxError(data.jqXHR);
	})

	$('#searchbar .smartkeywording-completions').autocomplete({
    source: function(request, response) {
    	$('#searchbar').one('smartkeywordingcompletions', function(e, data) {
    		response(data.keywords)
    	})
    	$('#searchbar').smartkeywording('completions', request.term)
    },
    delay : 200,
    minLength : 3,
    autoFocus : true
  })

	$("#searchbar").bind('autocompleteselect', function(e, ui) {
	 	location.href="/assets/" + ui.item.value + "/_/_";
	})

	$("#keywording").smartkeywording();

	$('#keywording .smartkeywording-completions').autocomplete({
    source: function(request, response) {
    	$('#keywording').one('smartkeywordingcompletions', function(e, data) {
    		response(data.keywords)
    	})
    	$('#keywording').smartkeywording('completions', request.term)
    },
    delay : 200,
    minLength : 3,
    autoFocus : true
  })

	$("#keywording").bind('smartkeywordingerror', function(e, data) {
		handleAjaxError(data.jqXHR);
	})

	$("#keywording").bind('autocompleteselect', function(e, ui) {
		$('#keywording .smartkeywording-completions').val('')
		$('#loadingDiv').show()
		$('#keywording').smartkeywording('selected', [ui.item], true)
		e.preventDefault();
	})

	$('#keywording').bind('smartkeywordingselected', function(e, data) {
		$.each(data.keywords, function() {
			var keyword = this
			var li = keywordElement(keyword)
			li.hide()
			$('#keywording .smartkeywording-selected').append(li);
			li.click(function() {
				$('#loadingDiv').show()
				$('#keywording').smartkeywording('deselected', [keyword])
				$(this).fadeOut(1000)
			})
			li.fadeTo(1000, 1)
		})
	})

	$('#keywording').data('smartkeywording').settings.proposed = []

	$('#keywording').bind('smartkeywordingproposals', function(e, data) {
		$('#loadingDiv').hide()
		var settings = $(this).data('smartkeywording').settings
		data.proposals.each(function() {
			var keyword = this
			if ($.inArray(keyword.label, settings.proposed) < 0) {
				settings.proposed.push(keyword.label)
				var li = keywordElement(keyword)
				$('#keywording .smartkeywording-proposals').append(li);
				li.click(function() {
					$('#keywording').smartkeywording('selected', [keyword])
					$('#loadingDiv').show()
					$(this).fadeTo(1000, 0, function() {
						console.log($(this))
						$(this).css('visibility', 'hidden')
					})
				})
			} else {
				$('#keywording .smartkeywording-proposals .keyword').each(function() {
					var cur = $(this).data('smartkeywording').keyword
					if (cur.label === keyword.label) {
						$(this).css('visibility', 'visible')
						$(this).fadeTo(1000, 1)
					}
				})
			}
		})
		$('#keywording .smartkeywording-proposals .keyword').each(function() {
			var cur = $(this).data('smartkeywording').keyword
			removed = true;
			data.proposals.each(function() {
				if (cur.label === this.label) {
					removed = false;
				}
			})
			if (removed) {
				$(this).fadeTo(1000, 0)
				$(this).css('visibility', 'hidden')
			}
		})
	})

	var presentKeywords = []
	$('#keywording .smartkeywording-selected .keyword').each(function() {
		var keyword = $.parseJSON($(this).attr('data-smartkeywording'))
		presentKeywords.push(keyword)
		$(this).remove()
	})
	$('#keywording').smartkeywording('selected', presentKeywords, true)

	function keywordElement(keyword) {
		var li = $('<li>').attr("class", "keyword");
		li.data('smartkeywording', { keyword: keyword })
		var link = $('<a>').attr("href", "#")
		var icon = $('<i>').attr("class", "icon-tag");
		var span = $('<span style="margin-left:2px">');
		span.text(keyword.label);
		li.append(link.append(icon.after(span)))
		return li;
	}

	function handleAjaxError(jqXHR) {
		console.log("error " + jqXHR.status + " occurred: " + jqXHR.statusText);
	}

}