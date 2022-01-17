function handle_drop(){
        // TODO:
           // is it over the menu
           // 1. Drop if there is a target
           // 2. Remove, if not over a canvas
           // 3. Remove, if dragging a clone
           // 4. Move back to start position if not a clone (maybe not?)
        dragTarget.removeClass('drag_active');
        dragTarget.removeClass("drag_indication");
        if (dropTarget && dropTarget.length){
            dropTarget.removeClass('drop_active');
            if (blockType(dragTarget) === 'step' || blockType(dragTarget) === 'context'){
                // Drag a step to snap to a step
                // console.log('snapping a step togther')
                console.log('dropTarget: %o', dropTarget);
                console.log('parent: %o', dropTarget.parent());
                dropTarget.parent().append(dragTarget);
                dragTarget.css({
                    position: 'relative',
                    left: 0,
                    top: 0,
                    display: 'inline-block'
                });
                dragTarget.trigger('add_to_script');
            }else{
                // Insert a value block into a socket
                // console.log('Inserting a value into a socket');
                dropTarget.find('input, select').remove();
                dropTarget.append(dragTarget);
                dragTarget.css({
                    position: 'relative',
                    left: 0,
                    top: 0,
                    display: 'inline-block'
                });
                dragTarget.trigger('add_to_socket');
            }
        }else if ($('.block_menu').cursorOver()){
            // delete block if dragged back to menu
            // console.log('deleting a block');
            dragTarget.trigger('delete_block')
            dragTarget.remove();
        }else if (dragTarget.overlap(targetCanvas)){
            // generally dragged to canvas, position it there
            // console.log('Drop onto canvas');
//            var currPos = dragTarget.offset();
            dropCursor.before(dragTarget);
            dropCursor.remove();
            dropCursor = null;
            dragTarget.css({position: 'relative', top: 0, left: 0, display: 'block'});
            dragTarget.trigger('add_to_workspace');
            $('.scripts_workspace').trigger('add');
        }else{
            if (cloned){
                // console.log('remove cloned block');
                dragTarget.remove();
            }else{
                // console.log('put block back where we found it');
                if (startParent){
                    if (startParent.is('.socket')){
                        startParent.children('input').remove();
                    }
                    startParent.append(dragTarget);
                    dragTarget.css({
                        position: 'relative',
                        top: 0,
                        left: 0,
                        display: 'inline-block'
                    });
                }else{
                    targetCanvas.append(dragTarget);
                    dragTarget.offset(startPosition);
                }
            }
        }
        if (dragPlaceholder){
            dragPlaceholder.remove();
            dragPlaceholder = null;
        }
        if (dropCursor){
            dropCursor.remove();
            dropCursor = null;
        }
    }