function() {
           this.el.dataset.uid = _.uniqueId();
           _.bindAll(this, 'render', 'add', 'scroll');
           this.template = Handlebars.compile( $('#tracks-template').html() );
           this.collection.bind('reset', this.render);
           this.collection.bind('remove', this.remove);
           this.collection.bind('add', this.add);
         //  this.collection.bind('add', this.updateScroll);
           this.rover = this.options.rover;
           this.rover.bind('change:displayMin change:displayMax change:min change:max', this.scroll)
           this.rover.canvasContentDiv = this.el;
        }