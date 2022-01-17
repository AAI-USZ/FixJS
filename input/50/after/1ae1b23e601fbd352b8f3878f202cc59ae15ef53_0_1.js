function(req, res){
			this.showView('gantt', {
				model: this.get('currentProject')
			});
		}