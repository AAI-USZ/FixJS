function isTabInList(e) {
				// Don't indent on Ctrl+Tab or Alt+Tab
				return e.keyCode === tinymce.VK.TAB && !(e.altKey || e.ctrlKey) &&
					(ed.queryCommandState('InsertUnorderedList') || ed.queryCommandState('InsertOrderedList'));
			}