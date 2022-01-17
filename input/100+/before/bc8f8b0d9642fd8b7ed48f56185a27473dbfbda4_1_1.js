function(editable, image, note) {
        ///	<summary>
        ///		Creates a Save button on the editable note.
        ///	</summary>
        var ok = $('<a class="image-annotate-edit-ok">OK</a>');

        ok.click(function() {
            var form = $('#image-annotate-edit-form form');
            var text = $('#image-annotate-text').val();
            $.fn.annotateImage.appendPosition(form, editable)
            image.mode = 'view';

            // Save via AJAX
            if (image.useAjax) {
                $.ajax({
                    url: image.saveUrl,
                    data: form.serialize(),
                    error: function(e) { alert("An error occured saving that note.") },
                    success: function(data) {
				if (data.annotation_id != undefined) {
					editable.note.id = data.annotation_id;
				}
		    },
                    dataType: "json"
                });
            }

            // Add to canvas
            if (note) {
                note.resetPosition(editable, text);
            } else {
                editable.note.editable = true;
                note = new $.fn.annotateView(image, editable.note)
                note.resetPosition(editable, text);
                image.notes.push(editable.note);
            }

            editable.destroy();
        });
        editable.form.append(ok);
    }