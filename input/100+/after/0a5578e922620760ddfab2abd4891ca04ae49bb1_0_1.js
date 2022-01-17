function start_drag(event){
        // console.log('trying to start drag');
        // called on mousemove or touchmove if not already dragging
        if (!blend(event)) {return undefined;}
        if (!drag_target) {return undefined;}
		var self = $(event.target);
		if(self.text('►')){
			console.log('is this still true?')
			return false;
		}
		 drag_target.addClass("drag_indication");
        // console.log('start_drag');
        current_position = {left: event.pageX, top: event.pageY};
        // target = clone target if in menu
        if (drag_target.is('.block_menu .wrapper')){
            drag_target.removeClass('drag_indication');
            drag_target = drag_target.clone(true);
            drag_target.addClass('drag_indication');
            cloned = true;
        }
        dragging = true;
		
		
        // get position and append target to .content, adjust offsets
        // set last offset
        // TODO: handle detach better
        if (drag_target.parent().is('.socket')){////////look at this if statement
			 var classes = drag_target.parent().attr('class');

            classes = classes.replace("socket","").trim();
            // console.log(classes);
            if(classes == "boolean"){           
                drag_target.parent().append('<select><option>true</option><option>false</option></select>');
            }else{
                if(!classes || classes=="string"){
                    classes = '\"text\"';
                }
                drag_target.parent().append('<input type="'+classes+'"/>');
            }
			drag_target.parent().append('<input />');
        }
        drag_target.css('position', 'absolute');
		if (drag_target.is('.scripts_workspace .wrapper')){
            drag_placeholder = $('<div class="drag_placeholder"></div>');
            drag_placeholder.height(drag_target.outerHeight());
            drag_target.before(drag_placeholder);
        }
        $('.content').append(drag_target);
        drag_target.offset(start_position);
        potential_drop_targets = get_potential_drop_targets();
        drop_rects = $.map(potential_drop_targets, function(elem, idx){
            return $(elem).rect();
        });

        // start timer for drag events
        timer = setTimeout(hit_test, drag_timeout);
        return false;
    }