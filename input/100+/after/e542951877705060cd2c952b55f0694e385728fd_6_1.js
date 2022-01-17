function($, _, Backbone, measuresTemplate, measuresCreate, measuresList){
  "use strict";

  var measuresView = Backbone.View.extend({
      containers: {
        viewstack: '.measures_content',
        create: '.create_measure_container',
        list: '.list_measures_container' 
      },  
      events: {
        'click .create_measure': 'displayCreate',
        'click .list_measures': 'displayList'
      },
      initialize: function(){
        //console.log('measuresView.init');	

        this.setCollections();

        this.measuresCreateView = new measuresCreate({collections: this.options.collections});
        this.measuresListView = new measuresList({collections: this.options.collections});

        this.options.collections.measures.on('add', this.displayList, this);
      },
      render: function(){
        //console.log('measuresView.render');	
        var data = {},
            compiledTemplate = _.template( measuresTemplate, data );

        $(this.el)
          .empty()
          .append( compiledTemplate );

        this.renderCreate();
        this.renderList();

        this.displayList();

        return this;
      },
      renderCreate: function() {
        //console.log('measuresView.renderCreate');
        $(this.el).find(this.containers.create)
          .empty()
          .append(this.measuresCreateView.render().el); 
      },      
      renderList: function() {
        //console.log('measuresView.renderList');
        $(this.el).find(this.containers.list)
          .empty()
          .append(this.measuresListView.render().el); 

      },
      displayCreate: function() {
        console.log('measuresView.createMeasure');
        this.toggle(this.containers.create, this.containers.list);  
      },
      displayList:function() {
        console.log('measuresView.listMeasures');
        this.toggle(this.containers.list, this.containers.create);   
      },
      toggle: function(to, from) {
        $(this.el)
          .find(from).addClass('hide')
        .end()  
          .find(to).removeClass('hide');  
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