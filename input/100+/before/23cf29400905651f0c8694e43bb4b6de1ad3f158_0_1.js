function()
			{
				this.model.get('attr').description = $(this.model.get('attr').description).text(); //escape html so it doesn't kill the css!!!
				$(this.el).html( _.template(this.getTemplate(),this.model.attributes ) ).attr('id','player-citation-'+ this.model.id);
			}