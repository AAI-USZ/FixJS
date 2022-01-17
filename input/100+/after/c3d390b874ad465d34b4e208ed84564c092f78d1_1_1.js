function() {
				runs(function() {
					var context = 'hi i am a context';
					var basespy = jasmine.createSpy();
					basespy.name = 'basespy';
					var childspy = jasmine.createSpy();
					childspy.name = 'childspy';
					var model = new Backbone.Model;
					model.set('a', new Backbone.Model);
					model.get('a').set('b', new Backbone.Model);
					model.get('a').get('b').set('c', new Backbone.Model);
					model.get('a').get('b').get('c').set('d', new Backbone.Model);

					model.live('a b c d', basespy, context);
					model.get('a').live('b c d', childspy, context);
					expect(basespy).toHaveBeenCalled();		
					expect(childspy).toHaveBeenCalled();

					model.get('a').die('b c d', childspy, context);

					model.get('a').get('b').get('c').unset('d');
					model.get('a').get('b').get('c').set('d', new Backbone.Model);

					expect(basespy.callCount).toEqual(2);
					expect(childspy.callCount).toEqual(1);

					model.die('a b c d', basespy, context);
					model.get('a').get('b').get('c').unset('d');
					model.get('a').get('b').get('c').set('d', new Backbone.Model);

					expect(basespy.callCount).toEqual(2);
					expect(childspy.callCount).toEqual(1);
				});		
			}