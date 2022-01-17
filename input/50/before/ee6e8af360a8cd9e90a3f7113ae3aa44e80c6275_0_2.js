function (model) {
				console.log("adding ", model.get('name'));
				this.$el.append("<li>" + model.get('name') + "</li>");
			}