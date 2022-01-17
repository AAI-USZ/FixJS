function removeClass (e, classToRemove) {
			$.single(e.target).removeClass(e.data['class'] || classToRemove);
		}