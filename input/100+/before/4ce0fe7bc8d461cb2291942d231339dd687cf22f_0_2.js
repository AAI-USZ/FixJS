function() {
    var Task, TaskCollection, TaskList,
      __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
      __hasProp = Object.prototype.hasOwnProperty,
      __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

    TaskCollection = require("../collections/tasks").TaskCollection;

    Task = require("../models/task").Task;

    TaskList = require("./tasks_view").TaskList;

    exports.TodoListWidget = (function(_super) {

      __extends(TodoListWidget, _super);

      TodoListWidget.prototype.id = "todo-list";

      TodoListWidget.prototype.tagName = "div";

      TodoListWidget.prototype.el = "#todo-list";

      TodoListWidget.prototype.events = {
        "click #new-task-button": "onAddClicked",
        "click #edit-button": "onEditClicked"
      };

      /* Constructor
      */

      function TodoListWidget(model) {
        this.model = model;
        this.onEditClicked = __bind(this.onEditClicked, this);
        TodoListWidget.__super__.constructor.call(this);
        this.id = this.model.slug;
        this.model.view = this;
      }

      TodoListWidget.prototype.remove = function() {
        return $(this.el).remove();
      };

      /* configuration
      */

      TodoListWidget.prototype.render = function() {
        var breadcrump, path;
        $(this.el).html(require('./templates/todolist'));
        this.$(".todo-list-title span.description").html(this.model.title);
        path = this.model.humanPath.split(",").join(" / ");
        this.$(".todo-list-title span.breadcrump").html(path);
        this.taskList = new TaskList(this, this.$("#task-list"));
        this.archiveList = new TaskList(this, this.$("#archive-list"));
        this.tasks = this.taskList.tasks;
        this.archiveTasks = this.archiveList.tasks;
        this.newButton = $("#new-task-button");
        this.showButtonsButton = $("#edit-button");
        this.newButton.hide();
        breadcrump = this.model.humanPath.split(",");
        breadcrump.pop();
        $("#todo-list-full-breadcrump").html(breadcrump.join(" / "));
        $("#todo-list-full-title").html(this.model.title);
        return this.el;
      };

      TodoListWidget.prototype.onAddClicked = function(event) {
        var task,
          _this = this;
        task = new Task({
          done: false,
          description: "new task",
          list: this.model.id
        });
        return task.save(null, {
          success: function(data) {
            data.url = "tasks/" + data.id + "/";
            _this.tasks.add(data);
            $(".task:first .description").focus();
            helpers.selectAll($(".task:first .description"));
            if (!_this.isEditMode) {
              return $(".task:first .task-buttons").hide();
            } else {
              return $(".task:first .task-buttons").show();
            }
          },
          error: function() {
            return alert("An error occured while saving data");
          }
        });
      };

      TodoListWidget.prototype.onEditClicked = function(event) {
        if (!this.isEditMode) {
          this.$(".task:not(.done) .task-buttons").show();
          this.newButton.show();
          this.isEditMode = true;
          return this.showButtonsButton.html("hide buttons");
        } else {
          this.$(".task-buttons").hide();
          this.newButton.hide();
          this.isEditMode = false;
          return this.showButtonsButton.html("show buttons");
        }
      };

      /*
          # Functions
      */

      TodoListWidget.prototype.loadData = function() {
        var _this = this;
        this.archiveTasks.url += "/archives";
        this.archiveTasks.fetch();
        return this.tasks.fetch({
          success: function() {
            if ($(".task:not(.done)").length > 0) {
              return $(".task:first .description").focus();
            } else {
              return _this.onAddClicked();
            }
          }
        });
      };

      TodoListWidget.prototype.moveToTaskList = function(task) {
        return this.tasks.prependTask(task);
      };

      return TodoListWidget;

    })(Backbone.View);

  }