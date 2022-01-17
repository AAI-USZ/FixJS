function () {
			// Restore whatever previous onbeforeload hook existed
			window.onbeforeunload = otherOnBeforeUnload;
		}