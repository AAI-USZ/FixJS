function(exports) {
    
    /**
     * Models
     */
    exports.Library = Backbone.Model.extend({
      idAttribute: 'name',
      
      defaults: function() {
        return {
          name: '',
          title: '',
          description: '',
          type: 'library',
        }
      },
      
      initialize: function() {
        var selectable = new Backbone.Picky.Selectable(this);
        _.extend(this, selectable);
      }
    });
    
    exports.LibraryCollection = Backbone.Collection.extend({
      model: exports.Library,

      url: '/api/metadata/libraries',

      initialize: function() {
        var multiSelect = new Backbone.Picky.MultiSelect(this);
        _.extend(this, multiSelect);
      }
    });
    
    exports.LibraryView = Backbone.View.extend({
      tagName: 'tr',
      
      template: $('#template').text(),
      
      events: {
        'click input[type="checkbox"].selector' : 'select',
        'click .namefield'                      : 'goto',
        'click'                                 : 'select',
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
      
      goto: function(e) {
        e.stopPropagation();
        window.location.href = '/docs/' + this.model.get('name');
      },
      
      selected: function(e) {
        this.$('input[type="checkbox"].selector').attr('checked', true);
      },

      deselected: function(e) {
        this.$('input[type="checkbox"].selector').attr('checked', false);
      },
    });
    
    exports.AppView = Backbone.View.extend({
      el: $('#appview'),
      
      events: {
        
      },
      
      initialize: function() {
        this.libraries = new exports.LibraryCollection;
        
        this.table = this.$('tbody');
        
        // bind model events
        this.libraries.on('add', this.addOne, this);
        this.libraries.on('reset', this.addAll, this);
        this.libraries.on('all', this.render, this);
        this.libraries.on('select:some', this.selectedSome, this);
        this.libraries.on('select:all', this.selectedAll, this);
        this.libraries.on('select:none', this.deselected, this);
        
        this.libraries.fetch();
      },
      
      render: function() {
        return this;
      },
      
      addOne: function(item) {
        var view = new exports.LibraryView({
          model: item
        });
        this.table.append(view.render().el);
      },

      addAll: function() {
        this.libraries.each($.proxy(this.addOne, this));
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
        this.$('#editList')
          .removeClass('disabled')
          .removeAttr('disabled');
      },

      disableEditButton: function() {
        this.$('#editList')
          .addClass('disabled')
          .attr('disabled', 'disabled');
      },

      selectedSome: function(e) {
        this.enableDeleteButton();
        if (this.list.selectedLength == 1) {
          this.enableEditButton();
        }
        else {
          this.disableEditButton();
        }
      },

      selectedAll: function(e) {
        this.enableDeleteButton();
        if (this.list.selectedLength == 1) {
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
    });
    
  }