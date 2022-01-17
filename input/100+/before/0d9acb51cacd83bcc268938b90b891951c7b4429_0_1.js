function() {
			var mode = this.mode()
			var feedback = this.feedback().filter( function(el) { 
				var condition = !el.yourFeedback && el.comment.length > 0
				if( mode == 'yes' || mode == 'no' ) condition = condition && el.type == mode
				if( mode == 'friends' ) condition = condition && el.friend()

				return condition
			}) || [] 
			return this.all() ? feedback : feedback.slice(0,5)
		}