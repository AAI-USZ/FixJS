function(box, dv, tv, model, util, cc, auth) {
		var path = document.location.pathname;
		var basepath = path.slice(0,path.lastIndexOf('/')); // chop off 2 /'s
		basepath = basepath.slice(0,Math.max(0,basepath.lastIndexOf('/'))) || '/';


		var new_group = function() {
		var bv = new box.InstanceBox();
		$('#mainpanel').append(bv.render());
		};


		$("#definitions_url").val("http://"+document.location.host+[basepath,'tests','rooms-and-buildings.rdf'].join('/'));
		$("#url").val("http://"+document.location.host+ [basepath,'tests','events-diary.rdf'].join('/'));
		$('#new_group').click(new_group); 

		// $('body').prepend((new dv.Simple()).render());
		var things_view = new tv.TableView({
			el:$('table')[0],
			columns:[
				function(m) {
					var view = new tv.GenericItemView({model:m});
					view.render();
					view.$el.addClass('item').draggable({revert:"invalid", helper:"clone", appendTo:'body'});
					view.$el.data('view',view);
					view.$el.data('model',view.options.model);
					return view.el;
				}
			]
		});

		var Source = Backbone.Model.extend({
			name: "Things",
			url: ""
		});
		var Sources = Backbone.Collection.extend({
			initialize: function (models, options) {
				var handler = options.view.addSource.bind(options.view);
				this.bind("add", handler);
				this.add(models);
			}
		});		
		var SourcesView = Backbone.View.extend({
			el: $("#sources ul"),
			initialize: function () {
				this.render();
			},
			render: function () {
				// null; // what?! 
			},
			addSource: function (model) {
				console.log("adding ", model.get('name'));
				this.$el.append("<li>" + model.get('name') + "</li>");
			}
		});
		
		function slideOut () {
			$("#slidepanel").animate({ left: 0 }, function() {
				$("#tab").addClass("flip-horizontal"); 
			});
		}
		function slideIn () {
			$("#slidepanel").animate({ left: -$("#datapanel").outerWidth() }, function() {
				$("#tab").removeClass("flip-horizontal");
			});
		}
		// set up panel toggle handler
		$("#toggle_data").click(function(){
			if ( parseInt($("#slidepanel").css('left'),10) === 0 ){
				slideIn();
			} else {
				slideOut();
			}
		});		
		$("#mainpanel").click(function(){
			slideIn();
		});		
		$("li").mouseover(function(e){
			console.log("e", e);
			$(e.target).animate({
				left: -300 
			});
		});
		
		var load = function() {
			var buildings_url = $("#definitions_url").val();
			var data_url = $('#url').val();
			var buildings = model.get_rdf(buildings_url);
			buildings.fetch().then(function() {
				console.log('loaded buildings');
				var data =  model.get_rdf(data_url);
				data.fetch().then(function() {
					console.log(' loaded events ');
					data.each(function(b) { things_view.collection.add(b); });
				});
				buildings.each(function(b) { things_view.collection.add(b); });
			});						
			var buildings_source = new Source({ name: "Buildings", url: $("#definitions_url").val()});
			var events_source = new Source({ name: "Events", url: $('#url').val()});
			var sourcesView = new SourcesView();
			new Sources ( [buildings_source, events_source], {view: sourcesView});
			$("#sources").append(sourcesView.render());
			// expand panel on load
			slideOut();			
		};
		$('.load').click(load);
		$('form').submit(load);
		load();
		new_group();
	}