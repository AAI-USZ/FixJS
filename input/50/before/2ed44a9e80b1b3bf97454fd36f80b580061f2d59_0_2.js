function(){

        	this.template = Em.Handlebars.compile('GeocamResponderMaps.FormInformation');

        	GeocamResponderMaps.MapSets.content.objectAt(this.get('contentIndex')).set('name', 'I was changed');

        	

        	this.refresh();

        }