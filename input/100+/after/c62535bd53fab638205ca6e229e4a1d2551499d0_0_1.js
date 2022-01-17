function(){

		// Convert interests text field into a tag-it widget
		$("#id_interests").hide()
			.after("<ul id='tagit-interests'></ul>")
			.change(rebuildExpertiseTaglist);
		$("#tagit-interests").tagit({
			availableTags: INTEREST_SUGGESTIONS,
			singleField: true,
			singleFieldNode: $("#id_interests"),
			onTagAdded: rebuildExpertiseTaglist,
			onTagRemoved: rebuildExpertiseTaglist,
			onTagClicked: rebuildExpertiseTaglist
		});

		// Convert the expertise text field into tag list with checkboxes sync'd to
		// interests
		$("#id_expertise").hide().after("<ul id='tags-expertise' class='taglist'></ul>");
		$("#tags-expertise").click(updateFieldFromTaglist);
		rebuildExpertiseTaglist();

		// word count
		$(".wordcount").each(function(i, el){

			var $el = $(el),
				placeholder = $el.find(".counter"),
				limit = parseInt(placeholder.text(), 10),
				currcount = 0,
				field = $el.children("textarea");

			function updateWordCount() {
				var words = $.trim(field.val()).split(" "),
					color = placeholder.parent().css("color"),
					length;

				if(words[0] == ""){ words.length = 0; }
				currcount = limit - words.length;
				placeholder.text(currcount);

				length = words.length;

				if(length >= limit && color != "#900" ) {
					placeholder.parent().css("color", "#900");
				}
				else if(words.length < limit && color == "#900") {
					placeholder.parent().css("color", "");
				}
			}
			
			updateWordCount();
			field.keypress(updateWordCount);
		});

		// Update "Other Profiles", preventing "blank" submissions
		$("#elsewhere input").mozPlaceholder();

	}