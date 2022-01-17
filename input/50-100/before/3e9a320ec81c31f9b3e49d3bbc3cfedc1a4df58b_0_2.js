function() {

			this.input = this.$("#new-todo");
			this.allCheckbox = this.$("#toggle-all")[0];

			Todos.bind('add', this.addOne, this);
			Todos.bind('reset', this.addAll, this);
			Todos.bind('all', this.render, this);

			this.$footer = this.$('footer');
			this.$main = $('#main');

			Todos.fetch();
		}