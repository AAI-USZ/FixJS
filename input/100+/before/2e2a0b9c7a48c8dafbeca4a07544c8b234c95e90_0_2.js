function () {



	var Task = Backbone.Model.extend({

		defaults: {

			completed: false

		}

	});



	var TaskView = Backbone.View.extend({

		tagName: "li",

		className: "task",

		elTemplate: $("#task-tpl").html(),

		events: {

			"mouseover": "mouseover",

			"mouseleave": "mouseleave",

			"click": "toggleStatus",

			"click .close": "close"

		},

		initialize: function () {

			_.bindAll(this, "setCheck", "toggleStatus");

			this.model.on("change:completed", this.setCheck);

		},

		render: function () {

			this.$el.append(_.template(this.elTemplate, {

				cid: this.model.cid,

				name: this.model.get("name")

			}));

			return this;

		},

		mouseover: function (e) {

			this.$(".close").show();

		},

		mouseleave: function (e) {

			this.$(".close").hide();

		},

		close: function (e) {

			this.model.collection.remove(this.model);

			return false;

		},

		toggleStatus: function (e) {

			var completed = this.model.get("completed");

			this.model.set("completed", !completed);

			return false;

		},

		setCheck: function (e) {

			var completed = this.model.get("completed");

			if (completed) {

				this.$(".taskName").addClass("completed");

				this.$(".checkbox").addClass("checked");

			} else {

				this.$(".taskName").removeClass("completed");

				this.$(".checkbox").removeClass("checked");

			}

			return false;

		}

	});



	var TaskList = Backbone.Collection.extend({

		model: Task

	});



	var TaskListView = Backbone.View.extend({

		tagName: "li",

		elTemplate: "#task-list-tpl",

		emptyTemplate: "#task-list-empty-tpl",

		statusTemplate: "#task-list-status-tpl",

		checkAllTemplate: "#task-list-checkAll-tpl",

		events: {

			"click .button": "addTask",

			"click .checkAll": "checkAll",

			"click .remove-selected": "removeSelected",

			"keypress input[type='text']": "keypress"

		},

		initialize: function () {

			var $elTemplate = $(this.elTemplate),

				$emptyTemplate = $(this.emptyTemplate),

				$statusTemplate = $(this.statusTemplate),

				$checkAllTemplate = $(this.checkAllTemplate);

			this.elTemplate = _.template($elTemplate.html());

			this.emptyTemplate = _.template($emptyTemplate.html());

			this.statusTemplate = _.template($statusTemplate.html());

			this.checkAllTemplate = _.template($checkAllTemplate.html());



			_.bindAll(this, "createTaskView", "renderTaskView", "removeTask");

			_.bindAll(this, "updateStatus", "checkAll", "toggleCheckAll", "toggleRemoveSelected");

			this.$el.attr("id", this.model.cid + "Tab");

			this.taskViews = {};

			this.collection.each(this.createTaskView);

			this.collection.on("add", this.createTaskView);

			this.collection.on("add", this.renderTaskView);

			this.collection.on("add", this.toggleCheckAll);

			this.collection.on("remove", this.removeTask);

			this.collection.on("remove", this.toggleCheckAll);

			this.collection.on("remove", this.toggleRemoveSelected);

			this.collection.on("change:completed", this.updateStatus);

			this.collection.on("change:completed", this.toggleCheckAll);

			this.collection.on("change:completed", this.toggleRemoveSelected);

		},

		render: function () {

			this.$el.append(this.elTemplate);

			this.collection.each(this.renderTaskView);

			if (this.isEmpty()) {

				this.$(".tasks").append(this.emptyTemplate);

			}

			return this;

		},

		createTaskView: function (task) {

			this.taskViews[task.cid] = new TaskView({model: task});

		},

		renderTaskView: function (task) {

			var taskView = this.taskViews[task.cid];

			this.$(".tasks li:last").before(taskView.render().el);

		},

		addTask: function () {

			var $input = this.$("input");

			var name = $input.val();

			if (name) {

				if (this.isEmpty()) {

					this.$(".empty").remove();

					this.$(".tasks").append(this.checkAllTemplate);

					this.$(".tasks").append(this.statusTemplate);

				}

				$input.val("");

				var task = new Task({name: name});

				this.collection.add(task);

				this.updateStatus();

			}

			$input.focus();

			return false;

		},

		removeTask: function (task) {

			var taskView = this.taskViews[task.cid];

			taskView.unbind();

			taskView.remove();

			if (this.isEmpty()) {

				this.$(".status").remove();

				this.$(".checkAll").remove();

				this.$(".tasks").append(this.emptyTemplate);

			}

			this.updateStatus();

		},

		keypress: function (e) {

	        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {

	            this.addTask();

	            return false;

	        }

		},

		isEmpty: function () {

			return this.collection.length == 0;

		},

		updateStatus: function () {

			var $status = this.$(".status"),

				$count = $status.find(".count"),

				$grammar = $status.find(".grammar");

			var count = this.getIncompleteCount();

			$count.empty().html(count);

			if (count == 1 && $grammar.html() != "task") {

				$grammar.empty().html("task");

			} else if (count != 1 && $grammar.html() != "tasks") {

				$grammar.empty().html("tasks");

			}

		},

		getIncompleteCount: function () {

			var incomplete = this.collection.filter(function (task) {

				return !task.get("completed");

			});

			return incomplete.length;

		},

		checkAll: function (e) {

			var $checkbox = $(e.target).find(".checkbox"),

				priorStatus = $checkbox.hasClass("checked");

			this.collection.each(function(task) {

				task.set("completed", !priorStatus); 

			});

			return false;

		},

		toggleCheckAll: function (e) {

			var $checkbox = this.$(".checkAll").find(".checkbox");

			var allTasksCompleted = this.collection.all(function(task) {

				return task.get("completed") == true;

			});

			if (allTasksCompleted) {

				$checkbox.addClass("checked");

			} else {

				$checkbox.removeClass("checked");

			}

		},

		toggleRemoveSelected: function (e) {

			var $removeSelected = this.$(".remove-selected");

			var somethingIsChecked = this.collection.find(function(task) {

				return task.get("completed") == true;

			});

			if (somethingIsChecked) {

				$removeSelected.show();

			} else {

				$removeSelected.hide();

			}

		},

		removeSelected: function (e) {

			var completed = this.collection.filter(function(task) {

				return task.get("completed") == true;

			});

			this.collection.remove(completed);

		}

	});



	var TodoTabView = Backbone.View.extend({

		tagName: "dd",

		elTemplate: $("#todo-tab-tpl").html(),

		render: function () {

			this.$el.append(_.template(this.elTemplate, {

				cid: this.model.cid,

				name: this.model.get("name")

			}));

			return this;

		}

	});



	var Todo = Backbone.Model.extend({

		defaults: {

			name: "Untitled"

		}

	});



	var Todos = Backbone.Collection.extend({

		model: Todo

	});



	var TodosView = Backbone.View.extend({

		initialize: function () {

			_.bindAll(this, "createTodoView", "renderTodoView");

			this.todoViews = {};

			this.collection.each(this.createTodoView);

			this.collection.on("add", this.createTodoView);

			this.collection.on("add", this.renderTodoView);

		},

		render: function () {

			this.collection.each(this.renderTodoView);

			return this;

		},

		createTodoView: function (todo) {

			this.todoViews[todo.cid] = {

				tab: new TodoTabView({

					model: todo

				}),

				tasks: new TaskListView({

					model: todo,

					collection: new TaskList()

				})

			}

		},

		renderTodoView: function (todo) {

			var todoView = this.todoViews[todo.cid];

			this.$(".tabs").append(todoView.tab.render().el);

			this.$(".tabs-content").append(todoView.tasks.render().el);

			TODOS.util.activateTab(todoView.tab.$el);

		},

		addTodo: function (name) {

			var todo = new Todo({name: name});

			this.collection.add(todo);

		}

	});



	var todos = new Todos();

	var todosView = new TodosView({

		el: "#tabsWrapper",

		collection: todos

	});



	return todosView.render();



}