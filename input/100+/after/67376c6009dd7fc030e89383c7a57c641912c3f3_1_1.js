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
			$('#sequence-cover-image').css({'background-image' : 'url("'+ this.model.get('cover_image') +'")'})

			console.log('cover image: '+ this.model.get('cover_image'))
			
			$('#sequence-cover-image').droppable({

				accept : '.database-asset-list',
				hoverClass : 'workspace-item-hover',
				tolerance : 'pointer',

				//this happens when you drop a database item onto a frame
				drop : function( event, ui )
				{
					ui.draggable.draggable('option','revert',false);
					zeega.app.editCoverImage({ item : zeega.app.draggedItem })
				}
			});

			return this;
		}