function() {

			this.input = this.$("#new-todo");
			this.allCheckbox = this.$("#toggle-all")[0];

			Todos.on('add', this.adcompleted, this);
			Todos.on('reset', this.addAll, this);
			Todos.on('all', this.render, this);

			this.$footer = $('#footer');
			this.$main = $('#main');

			Todos.fetch();
		}