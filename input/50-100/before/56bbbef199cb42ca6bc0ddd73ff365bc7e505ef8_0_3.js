function handleDrag_dragstart (e) {
        var handleDrag = INNERCONTEXT.EVENTS.handleDrag
          , edT = e.dataTransfer
          ;
		handleDrag.$draggedImage = $(this).addClass('beingDragged');
		edT.dropEffect = 'move';
		edT.effectAllowed = 'move';
	}