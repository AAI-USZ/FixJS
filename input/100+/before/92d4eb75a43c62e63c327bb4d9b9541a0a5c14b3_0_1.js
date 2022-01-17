function () {
			var active_editable_obj = this.getBaseElement();
			if (!active_editable_obj) {
				return;
			}

			var config = getCurrentConfig(this);
			var headingselector = config.headingselector;
			var headers = active_editable_obj.find(headingselector);

			$(Aloha.activeEditable.obj).attr('aloha-numerated-headers', 'true');

			if (typeof headers === 'undefined' || headers.length === 0) {
				return;
			}

			// base rank is the lowest rank of all selected headers
			var base_rank = 7;
			var that = this;
			headers.each(function () {
				if (that.hasContent(this)) {
					var current_rank = parseInt(this.nodeName.substr(1), 10);
					if (current_rank < base_rank) {
						base_rank = current_rank;
					}
				}
			});
			if (base_rank > 6) {
				return;
			}
			var prev_rank = null,
				current_annotation = [],
				annotation_pos = 0,
				i;

			// initialize the base annotations
			for (i = 0; i < (6 - base_rank) + 1; i++) {
				current_annotation[i] = 0;
			}

			headers.each(function () {
				// build and count annotation only if there is content in this header
				if (that.hasContent(this)) {

					var current_rank = parseInt(this.nodeName.substr(1), 10);
					if (prev_rank === null && current_rank !== base_rank) {
						// when the first found header has a rank
						// different from the base rank, we omit it
						$(this).find('span[role=annotation]').remove();
						return;
					} else if (prev_rank === null) {
						// increment the main annotation
						current_annotation[annotation_pos]++;
					} else if (current_rank > prev_rank) {
						// starts a sub title
						current_annotation[++annotation_pos]++;
					} else if (current_rank === prev_rank) {
						// continues subtitles
						current_annotation[annotation_pos]++;
					} else if (current_rank < prev_rank) {
						//goes back to a main title
						var current_pos = current_rank - base_rank;
						var j;
						for (j = annotation_pos; j > (current_pos); j--) {
							current_annotation[j] = 0; //reset current sub-annotation
						}
						annotation_pos = current_pos;
						current_annotation[annotation_pos]++;
					}

					prev_rank = current_rank;

					var annotation_result = '', i;
					if (config.trailingdot === true) {
						annotation_result = '';
						for (i = 0; i < current_annotation.length; i++) {
							if (current_annotation[i] !== 0) {
								annotation_result += (current_annotation[i] + ".");
							}
						}
					} else {
						annotation_result = current_annotation[0];
						for (i = 1; i < current_annotation.length; i++) {
							if (current_annotation[i] !== 0) {
								annotation_result += ("." + current_annotation[i]);
							}
						}
					}

					if (that.hasNote(this)) {
						$(this).find('span[role=annotation]').html(annotation_result);
					} else {
						$(this).prepend("<span role='annotation'>" + annotation_result + "</span> ");
					}
				} else {
					// no Content, so remove the Note, if there is one
					if (that.hasNote(this)) {
						$(this).find('span[role=annotation]').remove();
					}
				}
			});
		}