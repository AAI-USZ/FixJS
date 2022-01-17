function convertEmptyDropbox ($dropBox, comment) {
			$dropBox.detach(function convertEmptyDropbox_internal () {
				$.single(this).removeClass('newCAAimage')
				              .find('input')
				              .replaceWith($.make('div').text(comment))
				              .end()
				              .find('br, .closeButton')
				              .remove()
				              .end()
				              .find('select')
				              .prop('disabled', true);
			});
		}