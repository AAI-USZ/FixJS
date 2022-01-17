function($, _, Backbone, measureTemplate, measureEdit, measureShow){
  "use strict";

  var measuresView = Backbone.View.extend({
      containers: {
        viewstack: '.measureContent',
        display: '.measureShow',
        edit: '.measureEdit' 
      },  
      events: {
        'click .edit': 'displayEdit',
        'click .cancel': 'displayShow',
        'click .delete': 'deleteMeasure'
      },
      initialize: function(){
        //console.log('measureView.init');	
        this.measureEditView = new measureEdit({model: this.model, collection: this.collection, collections: this.options.collections});
        this.measureShowView = new measureShow({model: this.model, collection: this.collection, collections: this.options.collections});
        
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.deleteElement, this);
      },
      render: function(){
        //console.log('measureView.render');	
        //console.log('>> this.model:', this.model);
        var data = {},
            compiledTemplate = _.template( measureTemplate, data );

        $(this.el)
          .empty()
          .append( compiledTemplate );

        this.renderShow();
        this.renderEdit();

        this.displayShow();

        return this;
      },
      renderEdit: function() {
        //console.log('measureView.renderEdit');

        $(this.el).find(this.containers.edit)
          .empty()
          .append(this.measureEditView.render().el); 
      },      
      renderShow: function() {
        //console.log('measureView.renderShow');
        //console.log('>> this', this);

        $(this.el).find(this.containers.display)
          .empty()
          .append(this.measureShowView.render().el);
      },
      displayEdit: function() {
        //console.log('measuresView.displayEdit');
        $(this.el)
          .find(this.containers.display).addClass('hide')
        .end()  
          .find(this.containers.edit).removeClass('hide');
      },
      displayShow:function() {
        //console.log('measureView.displayShow');
        $(this.el)
          .find(this.containers.edit).addClass('hide')
        .end()  
          .find(this.containers.display).removeClass('hide');      
      },
      deleteMeasure: function() {
        console.log('measureView.deleteMeasure');
        var scoped_this = this;
        $(this.el).addClass('deleting');
        this.model.destroy({
          success: function(model, response) {
            console.log('model:delete:success:', response);
            scoped_this.options.collection.trigger('model:destroyed');
          },
          error: function(response) {
            console.log('model:delete:error:', response);
            $(scoped_this.el).removeClass('deleting');
          },
          wait: true

        });
      },
      deleteElement: function() {
        console.log('measureView.deleteElement');
        $(this.el).remove();
      }

    });

  return measuresView;
}