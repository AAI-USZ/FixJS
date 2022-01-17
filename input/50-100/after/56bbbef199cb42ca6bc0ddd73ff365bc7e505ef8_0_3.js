function handleDrag_dragstart (e) {
        var handleDrag = INNERCONTEXT.EVENTS.handleDrag
          , edT = e.originalEvent.dataTransfer
          ;
		edT.setDragImage(this, 0, 0);
		handleDrag.$draggedImage = $(this).addClass('beingDragged');
		edT.dropEffect = 'move';
		edT.effectAllowed = 'move';
	}