function()
			{
				var error = this.model.status == 'error' ? 'error' : '';
				this.model.get('attr').description = $(this.model.get('attr').description).text(); //escape html so it doesn't kill the css!!!
				$(this.el).html( _.template(this.getTemplate(), _.extend(this.model.attributes,{error:error}) ) ).attr('id','player-citation-'+ this.model.id);
			}