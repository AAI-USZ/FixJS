function($, _, Backbone, overlayTemplate, knobify){
  "use strict";

   var overlayView = Backbone.View.extend({
      className: 'overlay_view',
      events: {

      },     

      knob_options : {
        'width': '75',
        'fgColor': '#ffec03',
        'skin' :'tron',
        'thickness': '.2',
        'displayPrevious':true
      }, 
      
      initialize: function() {
        //console.log('overlayView.initialize');
        _.bindAll(this);
      
        this.on('overlay:type', this.displayType);
      },
      
      render: function() {
        //console.log('overlayView.render');
        var data = this.model.toJSON(),
            compiledTemplate;

        //console.log('data:', data);
        //console.log(data);

        compiledTemplate = _.template( overlayTemplate, data );

	      $(this.el)
	        .empty()
	        .append( compiledTemplate );

        //this.renderKnob();  

        return this;
      },

      renderKnob: function() {
        //console.log('overlayView.renderKnob');
        var instrument_id = this.model.get('instrument').id,
            instrument = this.options.collections;
        //console.log('overlay.model:', this.model);
        //console.log('overlay', this);
        ////console.log('overlay.options:', this.options);
        ////console.log('overlay.options.collections:', this.options.collections);
        ////console.log('instruments:', instrument);
        $(this.el).find('input').knob(this.knob_options);

      },

      displayType: function(overlay_type) {
        var header = $(this.el).find('h1'),
            copy = $(this.el).find('p'),
            copy_text = '';

        header.html(overlay_type);

        switch(overlay_type) {
          case 'chord':
            copy_text = 'Gb G G#...';
            break;
          case 'fret':
            copy_text = '0 1 2 3...';          
            break;
          case 'accent':
            copy_text = '~ - / \\ *';          
            break;
          case 'finger':
            copy_text = 'T I M R P';          
            break;    
          default:
            copy_text = 'shits gone wrong... back away slowly.';          
            break;       
        }

        copy.html(copy_text);

      }
       
    });

  return overlayView;
}