function() {

		var id = $('.canvas').data('board-id');



		showLoader();

		if (typeof id == 'undefined' || id == 0) {

			if ($('#board-name').val().trim() == '') {

				alert('You must enter a name for the board!');

				return;

			}

			$.ajax({

				url: '/-/canvas/new',

				type: 'POST',

				async: false,

				data: JSON.stringify({ name: $('#board-name').val(), description: $('#board-description').val() }),

				contentType: 'application/json; charset=utf-8',

				success: function(boardId) {

					id = boardId;

					$('.canvas').data('board-id', id);

				},

				error: function() {

					hideLoader();

					debugger;

				}

			});

		}



		$.ajax({

			url: '/-/canvas/save',

			type: 'POST',

			dataType: 'json',

			data: JSON.stringify({ boardId: id, boardItems: getItemsArray(id) }),

			contentType: 'application/json; charset=utf-8',

			success: function(data) {

				//debugger;

			},

			error: function(xhr) {

				debugger;

			},

			complete: hideLoader

		});

	}