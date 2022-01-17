function($, _, Backbone, measureTemplate, measureNew, measureShow){
  "use strict";

  var MeasureNewView, 
      MeasureShowView, 

      measuresView = Backbone.View.extend({
      containers: {
        viewstack: '.measureContent' 
      },  
      events: {
        'click .edit._measure': 'showEdit',
        'click .list_measure': 'showShow'
      },
      initialize: function(){
        //console.log('measureView.init');	
        MeasureNewView = new measureNew({model: this.model, collection: this.collection, collections: this.options.collections});
        MeasureShowView = new measureShow({model: this.model, collection: this.collection, collections: this.options.collections});
      },
      render: function(){
        //console.log('measureView.render');	
        var data = {},
            compiledTemplate = _.template( measureTemplate, data );

        $(this.el)
          .empty()
          .append( compiledTemplate );

        this.showShow();

        return this;
      },
      renderEdit: function() {
        //console.log('measureView.renderEdit');
        this.renderState(MeasureNewView.render().el);
      },      
      renderShow: function() {
        //console.log('measureView.renderShow');
        this.renderState(MeasureShowView.render().el);
      },
      renderState:function(state){
        //console.log('measureView.renderState');
        $(this.el).find(this.containers.viewstack)
          .empty()
          .append(state);
        this.delegateEvents(this.events);    
      },
      showEdit: function() {
        //console.log('measuresView.showEdit');
        this.renderEdit();
      },
      showShow:function() {
        //console.log('measureView.showShow');
        this.renderShow();      
      }
    });

    window.MeasureShowView = MeasureShowView;

  return measuresView;
}