function(measure) {
        //console.log('measure: ' + JSON.stringify(measure));
        var view = new measureView({model: measure, collection: measures, collections: collections});
        container.append(view.render().el);
      }