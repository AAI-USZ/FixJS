function() {
			it('makes die available on Backbone.Models', function() {
				var model = new Backbone.Model;
				expect(model.die).toBeDefined();
			});
			it('makes die available on Backbone.Collection', function() {
				var collection = new Backbone.Collection;
				expect(collection.die).toBeDefined();
			});
			it('live, callback, die, no callback', function() {
				runs(function() {
					var context = 'hi i am a context';
					var spy = jasmine.createSpy();
					var model = new Backbone.Model;
					var selectors = 'a b c d';
					model.live(selectors, spy, context);
					model.on('all', console.log, console);

					var a = new Backbone.Collection;
					var b = new Backbone.Model({id: 'b'});
					var c = new Backbone.Collection;
					var d = new Backbone.Model({id: 'd'});
					model.set('a', a);
					model.get('a').add(b);
					model.get('a').get('b').set('c', c);
					model.get('a').get('b').get('c').add(d);
					model.get('a').get('b').get('c').remove(d);
					model.get('a').get('b').get('c').add(d);
					model.get('a').get('b').get('c').remove(d);
					expect(spy).toHaveBeenCalledWith(d, c, b, a);
					expect(spy.callCount).toEqual(2);

					model.die(selectors, spy, context);
					model.get('a').get('b').get('c').add(d);
					model.get('a').get('b').get('c').remove(d);
					expect(spy.callCount).toEqual(2);
				});
			});			
			it('live, die, no callback', function() {
				runs(function() {
					var context = 'hi i am a context';
					var spy = jasmine.createSpy();
					var model = new Backbone.Model;
					var selectors = 'a b c d';
					model.live(selectors, spy, context);
					model.die(selectors, spy, context);

					var a = new Backbone.Collection;
					var b = new Backbone.Model({id: 'b'});
					var c = new Backbone.Collection;
					var d = new Backbone.Model({id: 'd'});
					model.set('a', a);
					model.get('a').add(b);
					model.get('a').get('b').set('c', c);
					model.get('a').get('b').get('c').add(d);

					expect(spy).not.toHaveBeenCalled();
				});		
			});
		}