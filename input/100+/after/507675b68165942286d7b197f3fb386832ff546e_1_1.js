function(exports) {
  
    /**************************
     * Models
     **************************/
    var Field = Backbone.DeepModel.extend({
      defaults: function() {
        return {
          name: '',
          heading: '',
          placeholder: '',
          type: 'String',
          required: false,
          default: '',
        }
      },
    })
  
    var FieldCollection = Backbone.Collection.extend({
      model: Field,
    })

    var Settings = Backbone.Model.extend({
      idAttribute: 'name',

      initialize: function(attributes) {
        if (attributes.hasOwnProperty('fields')) {
          var fields = attributes.fields;
        
          var fieldCollection = new FieldCollection(fields);
        
          this.set('fields', fieldCollection);
        }
        
        if (this.get('type') == 'list') 
          this.urlRoot = '/api/metadata/lists';
        else
          this.urlRoot = '/api/metadata/libraries'
      },

      toJSON: function() {
        return {
          name: this.get('name'),
          title: this.get('title'),
          description: this.get('description'),
          type: this.get('type'),
          fields: this.get('fields').toJSON(),
        }
      }
    })
  
    /**************************
     * Views
     **************************/
    var intConverter = function(direction, value) {
      switch (direction) {
        case "ModelToView":
          return value;
        case "ViewToModel":
          return parseInt(value);
      }
    };
    
    var choiceConverter = function(direction, value) {
      switch (direction) {
        case "ModelToView":
          return (Array.isArray(value)) ? value.join("\n") : "";
        case "ViewToModel":
          return value.split("\n");
      }
    };
    
    var NewFieldView = Backbone.View.extend({
      el: $('#newFieldModal'),

      events: {
        'click #addFieldCancel'  : 'cancel',
        'click #addFieldSubmit'  : 'submit',
        'submit #newFieldForm'   : 'submit',
        'shown'                  : 'shown',
        'hidden'                 : 'onHidden',
        'change select[name="type"]'  : 'onChangeType',
      },
    
      initialize: function(attributes) {
        this._modelBinder = new Backbone.ModelBinder();
        this.settings = attributes.settings;
        this.render();
      },
    
      render: function() {
        var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');

        bindings['options.maxLength'].converter = intConverter;
        bindings['options.min'].converter = intConverter;
        bindings['options.max'].converter = intConverter;
        bindings['options.choices'].converter = choiceConverter;
                
        this._modelBinder.bind(this.model, this.el, bindings);
      },
    
      show: function() {
        this.$el.modal('show');
      },
    
      shown: function() {
        this.$('input').first().focus();
      },
    
      onHidden: function() {
        this.model.set(this.model.defaults());
      },
      
      onChangeType: function(e) {
        this.$('.options')
          .not('.hidden')
          .addClass('hidden');
          
        var options = $(e.target.options[e.target.selectedIndex]).data('options');
        if (options) {
          this.$(options).removeClass('hidden');
        }
        
        this.model.unset('options');
      },
    
      cancel: function(e) {
        this.$el.modal('hide');
      },
    
      submit: function(e) {
        e.preventDefault();
        this.settings.get('fields').add(this.model.clone());
        this.$el.modal('hide');
      },
    });
  
    var EditFieldView = Backbone.View.extend({
      el: $('#editFieldModal'),

      events: {
        'click #editFieldCancel'      : 'onCancel',
        'click #editFieldSubmit'      : 'submit',
        'submit #editFieldForm'       : 'submit',
        'shown'                       : 'shown',
        'hidden'                      : 'onHidden',
        'change select[name="type"]'  : 'onChangeType',
      },
    
      initialize: function() {
        this._modelBinder = new Backbone.ModelBinder();

        this.render();
        
        this.model.on('change', this.onChanged, this);
      
        this.$el.modal('show');
        this.processCancel = true;
      },

      render: function() {
        var bindings = Backbone.ModelBinder.createDefaultBindings(this.el, 'name');

        bindings['options.maxLength'].converter = intConverter;
        bindings['options.min'].converter = intConverter;
        bindings['options.max'].converter = intConverter;
        bindings['options.choices'].converter = choiceConverter;
                
        this._modelBinder.bind(this.model, this.el, bindings);
      },
    
      shown: function() {
        this.$('input').first().focus();
      },
    
      onHidden: function() {
        this._modelBinder.unbind();
      },
    
      onChanged: function() {
        this.revert || (this.revert = {});
      
        for (var field in this.model.changedAttributes()) {
          if (this.revert.hasOwnProperty(field)) continue;
        
          this.revert[field] = this.model.previous(field);
        }
      },
    
      onCancel: function(e) {
        this.cancel();
        this.$el.modal('hide');
      },
      
      onChangeType: function(e) {
        this.$('.options')
          .not('.hidden')
          .addClass('hidden');
          
        var options = $(e.target.options[e.target.selectedIndex]).data('options');
        if (options) {
          this.$(options).removeClass('hidden');
        }
        
        this.model.unset('options');
      },
    
      cancel: function() {
        if (this.revert) {
          this.model.off(null, this.onChanged, this);
          this.model.set(this.revert);
        }
      
        this.processCancel = false;
      },
        
      submit: function(e) {
        e.preventDefault();
        this.$el.modal('hide');
      },
    });
  
    var FieldView = Backbone.View.extend({
      tagName: 'tr',
    
      template: Handlebars.compile($('#fieldTemplate').text()),
    
      events: {
        'click .icon-remove'  : 'delete',
        'click .namefield'    : 'edit',
        'mouseover'           : 'onMouseOver',
        'mouseleave'          : 'onMouseLeave',
      },
    
      initialize: function() {
        this.model.bind('change', this.render, this);
        this.model.bind('destroy', this.remove, this);
      },
    
      render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
      },
    
      delete: function(e) {
        e.preventDefault();
        this.model.destroy();
      },
    
      edit: function(e) {
        e.preventDefault();
        var editView = new EditFieldView({
          model: this.model
        });
      },
    
      onMouseOver: function(e) {
        this.$('.icon-remove')
          .removeClass('invisible');
      },
    
      onMouseLeave: function(e) {
        this.$('.icon-remove')
          .addClass('invisible');
      }
    });
  
    var SettingsView = Backbone.View.extend({
      el: $('#appview'),
    
      events: {
        'click #addField'   : 'addField',
        'click #save'       : 'save',
      },
    
      initialize: function() {
        this.table = this.$('tbody');
      
        this._modelBinder = new Backbone.ModelBinder();
      
        this.newFieldView = new NewFieldView({
          model: new Field,
          settings: this.model,
        });
      
        this.model.get('fields').bind('add', this.onNewField, this);
      
        this.render();
      },
    
      render: function() {
        var self = this;
      
        this._modelBinder.bind(this.model, this.$('#details'));
        this.model.get('fields').each($.proxy(this.onNewField, this));
      },
    
      onNewField: function(field) {
        var fieldView = new FieldView({
          model: field
        });
      
        this.table.append(fieldView.render().el);
      },
    
      addField: function(e) {
        this.newFieldView.show();
      },

      save: function(e) {
        this.model.save({}, {
          success: function(model, response) {
            var url = "";
            if (model.get('type') == 'list')
              url = '/lists/' + model.get('name');
            else if (model.get('type') == 'library')
              url = '/docs/' + model.get('name');
            
            window.location.href = url;
          },
          
          error: function(model, response) {
            console.log('error')
          }
        });
      }
    })
    
    /**
     * Module exports
     */
    exports.Settings = Settings;
    exports.SettingsView = SettingsView;
    
  }