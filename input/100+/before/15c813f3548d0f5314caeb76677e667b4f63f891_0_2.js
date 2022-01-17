function(param){

			this.$todos = $('#todo-list');
			this.$todoItems = this.$todos.find('li');
			this.$todosDone = this.$todos.find('.done');

			switch(param){
				default:
					this.$todoItems.show();
					break;
				case 'active':
					this.$todoItems.show().not('.done').hide();
					break;
				case 'completed':
					this.$todoItems.show();
					this.$todosDone.hide();
					break;
			}

			$('#filters li a')
				.removeClass('selected')
				.filter("[href='#/" + param + "']")
				.addClass('selected');
		}