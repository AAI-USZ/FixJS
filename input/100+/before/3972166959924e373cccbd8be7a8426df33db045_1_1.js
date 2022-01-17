function() {
			console.log('initialisation');
		    $('#qunit-header').hide();
			$('#qunit-banner').hide();
			$('#qunit-testrunner-toolbar').hide();
			$('#qunit-userAgent').hide();
			$('#qunit-tests').hide();
			$('#qunit-testresult').hide();

			window.view = Em.LazyCollectionView.create({
				elementId:"LazyCollectionView",
				content : [],
				itemViewClass : App.ItemView,
				rowHeight: 100,
				dataFieldName : 'item'
			});
			/*
			 * To be sure that ember and the componant now 
			 * and don't defer her insertion in the Dom in
			 * the the next runloop
			 */
			Ember.run(function(){ window.view.appendTo('#qunit-fixture'); });

			window.$view = $('#LazyCollectionView');
		}