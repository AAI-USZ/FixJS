function($, _, Backbone, measuresTemplate, measuresEdit, measuresList){
  "use strict";

  var MeasuresEditView, 
      MeasuresListView, 

      measuresView = Backbone.View.extend({
      containers: {
        viewstack: '.measuresContent' 
      },  
      events: {
        'click .create_measure': 'showCreate',
        'click .list_measures': 'showList'
      },
      initialize: function(){
        //console.log('measuresView.init');	

        this.setCollections();

        MeasuresEditView = new measuresEdit({collections: this.options.collections});
        MeasuresListView = new measuresList({collections: this.options.collections});

        window.MeasuresEditView = MeasuresEditView;
        window.MeasuresListView = MeasuresListView;
      },
      render: function(){
        //console.log('measuresView.render');	
        var data = {},
            compiledTemplate = _.template( measuresTemplate, data );

        $(this.el)
          .empty()
          .append( compiledTemplate );

        this.showList();

        return this;
      },
      renderEdit: function() {
        //console.log('measuresView.renderEdit');
        this.renderState(MeasuresEditView.render().el);
      },      
      renderList: function() {
        //console.log('measuresView.renderList');
        this.renderState(MeasuresListView.render().el);
      },
      renderState:function(state){
        //console.log('measuresView.renderState');
        $(this.el).find(this.containers.viewstack)
          .empty()
          .append(state);
        this.delegateEvents(this.events);    
      },
      showCreate: function() {
        //console.log('measuresView.createMeasure');
        this.renderEdit();
      },
      showList:function() {
        //console.log('measuresView.listMeasures');
        this.renderList();      
      },
      setCollections:function(){
        //set all collections in "collections" object to the view options object
        var that = this,
            collections = this.options.collections, 
            keys = _.keys( collections );
        _.each(keys, function(key){
          that.options[key] = collections[key];
        });
        //delete this.options.collections;
      }
    });

  return measuresView;
}