function(req, res){
			this.showView('gantt', {
				modelList: this.get('tasks')
			});
		}