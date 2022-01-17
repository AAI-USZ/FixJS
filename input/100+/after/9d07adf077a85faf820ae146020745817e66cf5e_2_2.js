function(range) {
			var
				i, documentWidth, editableLength, left, target,
				targetObj, scrollTop, top;

			// TODO in IE8 somteimes a broken range is handed to this function - investigate this
			if (!Aloha.activeEditable || typeof range.getCommonAncestorContainer === 'undefined') {
				return false;
			}

			// check if the designated editable is disabled
			for ( i = 0, editableLength = Aloha.editables.length; i < editableLength; i++) {
				if (Aloha.editables[i].obj.get(0) == range.limitObject &&
						Aloha.editables[i].isDisabled()) {
					return false;
				}
			}

			target = this.nextFloatTargetObj(range.getCommonAncestorContainer(), range.limitObject);
			if ( ! target ) {
				return false;
			}

			targetObj = jQuery(target);
			scrollTop = GENTICS.Utils.Position.Scroll.top;
			if (!targetObj || !targetObj.offset()) {
				return false;
			}
			top = targetObj.offset().top - this.obj.height() - 50; // 50px offset above the current obj to have some space above

			// if the floating menu would be placed higher than the top of the screen...
			if ( top < scrollTop) {
				top += 50 + GENTICS.Utils.Position.ScrollCorrection.top;
			}

			// if the floating menu would float off the bottom of the screen
			// we don't want it to move, so we'll return false
			if (top > this.window.height() + this.window.scrollTop()) {
				return false;
			}
			
			// check if the floating menu does not float off the right side
			left = Aloha.activeEditable.obj.offset().left;
			documentWidth = jQuery(document).width();
			if ( documentWidth - this.width < left ) {
				left = documentWidth - this.width - GENTICS.Utils.Position.ScrollCorrection.left;
			}
			
			return {
				left : left,
				top : top
			};
		}