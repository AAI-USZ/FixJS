function()
		{
			var _this = this;
			this.$el.html( this.model.get('title') );

			this.$el.attr('contenteditable','true').keypress(function(e){
				if(e.which==13)
				{
					e.preventDefault();
					$(this).blur();
				}
			})
			.blur(function(){
				_this.saveTitle();
			});

			//display the cover image
			$('#sequence-cover-image').css({'background-image' : 'url("'+ zeega.app.url_prefix+this.model.get('cover_image') +'")'})

			console.log('cover image: '+ this.model.get('cover_image'))

			return this;
		}