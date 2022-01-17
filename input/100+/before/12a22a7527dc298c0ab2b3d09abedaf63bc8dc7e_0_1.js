function loadAutoComplete(view){
		$.widget( "custom.vocabcomplete", $.ui.autocomplete, {
			_renderMenu: function( ul, items ) {
				var self = this,
					currentVocab = "";
				$.each( items, function( index, item ) {
					if ( item.vocab != currentVocab ) {
						ul.append( "<li class='ui-autocomplete-category'>" + item.vocab + "</li>" );
						currentVocab = item.vocab;
					}
					self._renderItem( ul, item );
				});
			}
		});
		$("#subject_search_filter" ).vocabcomplete( {
			source: base_url+"browse/vocabAutoComplete/"+view,
			minLength: 2,
			delimiter:/(,|;)\s*/,
			select: function( event, ui ) {
				$('#search-vocab-field').val(ui.item.label);
				if(view=='anzsrcfor'){
					subjectFilter = encodeURIComponent(ui.item.uri);
				}else subjectFilter = ui.item.label;
				changeHashTo(formatSearch(search_term,1,classFilter));
				//vocabLoadConcept(ui.item.uri, ui.item.vocab);
				//vocabLoadTree(ui.item.uri, ui.item.vocab);
			}
		});
		var watermark = 'Search for a subject';
		$('#subject_search_filter').val(watermark);
		$('#subject_search_filter').css('color', '#888');
		if($('#subject_search_filter').val()=='watermark'){
			$('#subject_search_filter').css('color', '#ddd');
		}
		$('#subject_search_filter').live('click', function(){
			if($(this).val()==watermark){
				$(this).val('');
				$(this).css('color', 'black');
			}
		});
		$('#subject_search_filter').live('blur', function(){
			if($(this).val()==''){
				$(this).val(watermark);
				$(this).css('color', '#888');
			}
		});
	}