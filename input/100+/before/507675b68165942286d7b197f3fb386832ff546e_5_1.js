function(exports) {
    
    /**
     * Models
     */
    exports.List = Backbone.Model.extend({
      idAttribute: 'name',
      
      defaults: function() {
        return {
          name: '',
          title: '',
          description: '',
        }
      },
      
      initialize: function() {
        var selectable = new Backbone.Picky.Selectable(this);
        _.extend(this, selectable);
      }
    });
    
    exports.ListCollection = Backbone.Collection.extend({
      model: exports.List,

      url: '/api/metadata/lists',

      initialize: function() {
        var multiSelect = new Backbone.Picky.MultiSelect(this);
        _.extend(this, multiSelect);
      }
    });
    
    exports.ListView = Backbone.View.extend({
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
        window.location.href = '/lists/' + this.model.get('name');
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
        this.lists = new exports.ListCollection;
        
        this.table = this.$('tbody');
        
        // bind model events
        this.lists.on('add', this.addOne, this);
        this.lists.on('reset', this.addAll, this);
        this.lists.on('all', this.render, this);
        this.lists.on('select:some', this.selectedSome, this);
        this.lists.on('select:all', this.selectedAll, this);
        this.lists.on('select:none', this.deselected, this);
        
        this.lists.fetch();
      },
      
      render: function() {
        return this;
      },
      
      addOne: function(item) {
        var view = new exports.ListView({
          model: item
        });
        this.table.append(view.render().el);
      },

      addAll: function() {
        this.lists.each($.proxy(this.addOne, this));
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