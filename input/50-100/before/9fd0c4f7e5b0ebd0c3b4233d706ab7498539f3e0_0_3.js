function(param){

			//this.$todos = $('#todo-list');
			//this.$todoItems = this.$todos.find('li');
			//this.$todoscompleted = this.$todos.find('.completed');

			switch(param){
				default:
					//this.$todoItems.show();
					console.log(Todos);
					break;
				case 'active':
					//this.$todoItems.show().not('.completed').hide();
					console.log(Todos.remaining());
					break;
				case 'completed':
					console.log(Todos.completed());
					//this.$todoItems.show();
					//this.$todoscompleted.hide();
					break;
			}

			$('#filters li a')
				.removeClass('selected')
				.filter("[href='#/" + param + "']")
				.addClass('selected');
		}