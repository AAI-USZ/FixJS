function(el){
				var _this = this;
				this.$el = $(el);
				this.loadEvents();

				var options = $.extend(settings, {
					state: "closed",
					action: "milestones",
					sort:"due_date"
				});

			 	this.callApi(options).success(function(resp){
			 		if(resp.data) resp= resp.data;
			 		_this.showMilestones(resp);
			 	}).error(function(resp){
			 		console.log(resp)
			 	});
			}