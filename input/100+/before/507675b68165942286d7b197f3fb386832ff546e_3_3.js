function(exports) {
    
    /**
     * Model Factories
     */
    exports.DocumentModelFactory = function(defaultValues) {
      return Backbone.Model.extend({
        defaults: function() {
          return defaultValues;
        },
        
        idAttribute: 'name',
        
        initialize: function() {
          var selectable = new Backbone.Picky.Selectable(this);
          _.extend(this, selectable);
        },
      });
    };
    
    exports.DocumentCollectionFactory = function(Model, url) {
      return Backbone.Collection.extend({
        model: Model,

        url: url,

        initialize: function() {
          var multiSelect = new Backbone.Picky.MultiSelect(this);
          _.extend(this, multiSelect);
        }
      });
    };
    
    exports.DocumentView = Backbone.View.extend({
      tagName: 'tr',
      
      template: $('#documentTemplate').text(),
      
      events: {
        'click input[type="checkbox"].selector' : 'select',
        'click'                                 : 'select',
        'click .namefield'                      : 'nameclick',
      },

      initialize: function() {
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
        this.model.on('selected', this.selected, this);
        this.model.on('deselected', this.deselected, this);
      },

      render: function() {
        this.$el.html(Mustache.render(this.template, this.model.toJSON()));
        this.$('input[type="checkbox"].selector').attr('checked', this.model.selected);

        return this;
      },
      
      select: function(e) {
        e.stopPropagation();
        this.model.toggleSelected();
      },
      
      nameclick: function(e) {
        e.stopPropagation();
      },
      
      selected: function(e) {
        this.$('input[type="checkbox"].selector').attr('checked', true);
      },

      deselected: function(e) {
        this.$('input[type="checkbox"].selector').attr('checked', false);
      },      
    });
    
    exports.NewDocumentView = Backbone.View.extend({
      el: $('#newDocumentModal'),

      events: {
        'click #addDocumentCancel'  : 'cancel',
        'click #addDocumentSubmit'  : 'submit',
        'submit #newDocumentForm'   : 'submit',
        'shown'                     : 'shown',
        'hidden'                    : 'onHidden',
        'change input[type="file"]' : 'fileChange'
      },

      initialize: function(attributes) {
        this._modelBinder = new Backbone.ModelBinder();
        this.library = attributes.library;
        this.render();
        this.fileInput = this.$('input[type="file"]').get(0);
      },

      render: function() {
        this._modelBinder.bind(this.model, this.el);
      },

      show: function() {
        this.$el.modal('show');
      },

      shown: function() {
        this.$('input').first().focus();
      },

      onHidden: function() {
        this.model.set(this.model.defaults());
        this.fileInput.value = '';
      },
      
      fileChange: function(e) {
        var file = this.fileInput.files[0];
        this.model.set('name', file.fileName);
      },

      cancel: function(e) {
        this.$el.modal('hide');
      },

      submit: function(e) {
        var self = this;
        
        e.preventDefault();
        
        var file = this.$("input[type='file']")[0].files[0];
        var fileName = this.model.get('name');
        
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', '/docs/records/' + fileName, true);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.onload = function(e) {
          if (this.status == 200) {
            console.log(this.response);

            var newModelJson = self.model.toJSON();
            delete newModelJson._file;
            self.library.create(newModelJson);
            self.$el.modal('hide');
          }
        };
        xhr.send(file);
      },
    });
    
    exports.EditDocumentView = Backbone.View.extend({
      el: $('#editDocumentModal'),

      events: {
        'shown'                       : 'onShown',
        'hide'                        : 'onHide',
        'click #editDocumentCancel'   : 'onCancel',
        'click #editDocumentSubmit'   : 'submit',
        'submit #editDocumentForm'    : 'submit',
      },

      initialize: function() {
        this._modelBinder = new Backbone.ModelBinder();

        this.render();
        this.model.on('change', this.onChanged, this);

        this.$el.modal('show');
        this.processCancel = true;
      },

      render: function() {
        this._modelBinder.bind(this.model, this.el);
      },

      onShown: function() {
        this.$('input').first().focus();
      },

      onHide: function() {
        this._modelBinder.unbind();
        this.model.off(null, this.onChanged, this);
        this.undelegateEvents();

        if (this.processCancel) this.cancel();
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

      cancel: function() {
        if (this.revert) {
          this.model.off(null, this.onChanged, this);
          this.model.set(this.revert);
        }

        this.processCancel = false;
      },

      submit: function(e) {
        e.preventDefault();
        var self = this;

        this.model.save({}, {
          success: function(model, response) {
            self.processCancel = false;
            self.$el.modal('hide');
          }
        })
      }
    });
    
    exports.LibraryView = Backbone.View.extend({
      el: $('#appview'),

      events: {
        'click #addDocument'        : 'addNewDocument',
        'click #editDocument'       : 'editDocument',
      },
      
      initialize: function(attributes) {
        this.library = new attributes.collectionType;
        
        this.table = this.$('tbody');
        
        this.newDocumentView = new exports.NewDocumentView({
          model: new attributes.modelType,
          library: this.library,
        })
        
        this.library.on('add', this.addOne, this);
        this.library.on('reset', this.addAll, this);
        this.library.on('all', this.render, this);
        this.library.on('select:some', this.selectedSome, this);
        this.library.on('select:all', this.selectedAll, this);
        this.library.on('select:none', this.deselected, this);

        this.library.fetch();
      },
      
      render: function() {
        return this;
      },
      
      addNewDocument: function() {
        this.newDocumentView.show();
      },
      
      editDocument: function() {
        for (var i in this.library.selected) {
          var editView = new exports.EditDocumentView({
            model: this.library.selected[i]
          });
        }
      },

      addOne: function(item) {
        var view = new exports.DocumentView({
          model: item
        });
        this.table.append(view.render().el);
      },

      addAll: function() {
        this.library.each($.proxy(this.addOne, this));
      },
      
      enableDeleteButton: function() {
        this.$('#delete')
          .removeClass('disabled')
          .removeAttr('disabled');
      },

      disableDeleteButton: function() {
        this.$('#delete')
          .addClass('disabled')
          .attr('disabled', 'disabled');
      },

      enableEditButton: function() {
        this.$('#editDocument')
          .removeClass('disabled')
          .removeAttr('disabled');
      },

      disableEditButton: function() {
        this.$('#editDocument')
          .addClass('disabled')
          .attr('disabled', 'disabled');
      },

      selectedSome: function(e) {
        this.enableDeleteButton();
        if (this.library.selectedLength == 1) {
          this.enableEditButton();
        }
        else {
          this.disableEditButton();
        }
      },

      selectedAll: function(e) {
        this.enableDeleteButton();
        if (this.library.selectedLength == 1) {
          this.enableEditButton();
        }
        else {
          this.disableEditButton();
        }
      },

      deselected: function(e) {
        this.disableDeleteButton();
        this.disableEditButton();
      },

      toggleSelectAll: function(e) {
        this.library.toggleSelectAll();
      }      
    });
    
    
  }