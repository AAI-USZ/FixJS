function(namespace, $, _, Backbone, ModelBinding, ModelBinder, User) {

  // Create a new module
  var BaseView = namespace.module();

   BaseView.Project = Backbone.View.extend({
    template: "base/project_base"
  });

  BaseView.Culture = Backbone.View.extend({
    template: "base/culture_base"
  });

  BaseView.Species = Backbone.View.extend({
    template: "base/species_base"
  });

  BaseView.Home = Backbone.View.extend({
    template: "base/home_base"
  });

  BaseView.NewProject = Backbone.View.extend({
    template: "base/new_project",

    _modelBinder: undefined,

    initialize:function () {
        this._modelBinder = new Backbone.ModelBinder();
    },

    bind: function() {
//        var bindings = {count: {selector: '[name=count]', converter: namespace.app.intConverter}};
//        var dateBindings = {startDate: {selector: '[name=startDate]', converter: namespace.app.dateConverter}};

        var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');
        bindings['count'].converter = namespace.app.intConverter;
        bindings['startDate'].converter = namespace.app.dateConverter;
        this._modelBinder.bind(this.model, this.el, bindings);
    },

    events: {
        "click #project-submit": "saveSelected"
    },

    saveSelected: function() {
        var view = this;
        this.model.set('enabled', true);
        if (namespace.app.parentProject){
            this.model.set('parent', namespace.app.parentProject.id);
            namespace.app.parentProject = null;
        }
        console.log('Saving new: ' + JSON.stringify(this.model));
        this.model.save({}, {success: function(model, response){
            view._modelBinder.unbind();
            namespace.app.router.navigate("/projects", true);
        }});

    },

    serialize: function() {
      return this.model.toJSON();
    }
  });

  BaseView.SpawnProject = Backbone.View.extend({
      template: "base/spawn_project",

      events: {
          "click #project-submit": "saveSelected"
      },

      saveSelected: function() {
          var view = this;
          ModelBinding.bind(this);
          this.model.set('enabled', true);
          if (namespace.app.parentProject){
              this.model.set('parent', namespace.app.parentProject.id);
              namespace.app.parentProject = null;
          }
          console.log('Saving new: ' + JSON.stringify(this.model));
          this.model.save({}, {success: function(model, response){
              namespace.app.router.navigate("/projects", true);
          }});

      },

      serialize: function() {
        return this.model.toJSON();
      }
    });

  BaseView.NewCulture = Backbone.View.extend({
    template: "base/new_culture",

    events: {
        "click #culture-submit": "saveSelected"
    },

    saveSelected: function() {
        var view = this;
        ModelBinding.bind(this);
        console.log('Saving new: ' + JSON.stringify(this.model));
        this.model.save({}, {success: function(model, response){
            namespace.app.router.navigate("/cultureList", true);
        }});

    },

    serialize: function() {
      return this.model.toJSON();
    }
  });

  BaseView.NewUser = Backbone.View.extend({
      template: "base/new_user",

      events: {
          "click #user-submit": "saveSelected"
      },

      saveSelected: function() {
          var view = this;
          var newEmail = $('#newUserEmail')[0].value;
          var newPass = $('#newUserPassword')[0].value;

          this.model = new User.Model({
            email: newEmail,
            password: newPass
          });
          console.log('Saving new: ' + JSON.stringify(this.model));
          this.model.save({}, {success: function(model, response){
              namespace.app.router.navigate("/", true);
              namespace.app.user.set({
                email: newEmail,
                password: newPass
              });
              $("#loginanchor").detach();
              namespace.app.trigger('login:submit');
          }});

      },

      serialize: function() {
        return this.model.toJSON();
      }
    });

  // Required, return the module for AMD compliance
  return BaseView;

}