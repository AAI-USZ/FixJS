function _undoSelling (socketName, id) {
	    $(document).find('#undoLastSelling').hide();

	    var data = {
	        id: id,
	    };
	    $.webSocket('send', {name: socketName, text: 'action: undoSelling ' + JSON.stringify(data)});
	}