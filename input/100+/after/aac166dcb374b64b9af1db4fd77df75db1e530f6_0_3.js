function(box, dv, tv, model, util, cc, auth) {
		var path = document.location.pathname;
		var basepath = path.slice(0,path.lastIndexOf('/')); // chop off 2 /'s
		basepath = basepath.slice(0,Math.max(0,basepath.lastIndexOf('/'))) || '/';
		
		var Source = Backbone.Model.extend({
			defaults: {name: "Things", url: ""	},
			fetch:function() {
				var d = util.deferred();
				console.log('source fetching ', this.get('url'), this);
				var c = model.get_rdf(this.get('url'));
				c.fetch().then(function() {
					console.log('calling resolve ');
					d.resolve(c);
				});
				return d.promise(); 
			}
		});
		
		var SourceCollection = Backbone.Collection.extend({
			model:Source // specify model type
			// no need to do this manually, Backbone's model magic
			// automatically converts all json objects passed in
			// to the model types specified above.
			// initialize: function (models, options) {
			//var handler = options.view.addSource.bind(options.view); // ?!?
			//this.bind("add", handler);
			//this.add(models);
			//}
		});		

		var SourcesView = Backbone.View.extend({
			render:function() {
				var this_ = this;
				this.$el.html(''); 
				this.options.collection.models.map(function(model) {
					try {
						this_.$el.append("<li>" + model.get('name') + "</li>");
					} catch(e) { console.error(e); }
				});
				return this;
			}
		});		

		var SidebarView = Backbone.View.extend({
			events: {
				"click .new_group": "_new_group",
				"click .toggle_data":"toggle_data"
			},
			initialize:function(options) {
				
			},
			_new_group : function() {
				var bv = new box.InstanceBox();
				// TODO do something about this --- move out to parent widget
				$('#mainpanel').append(bv.render());
			},
			render:function() {
				var sourcec = new SourceCollection(this.options.sources);
				this.$el.find(".sources").append(new SourcesView({
					el: this.$el.find(".sources ul"),
					collection:sourcec
				}).render().el);
				
				var things_view = new tv.TableView({
					el:this.$el.find('.things')[0],
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
				sourcec.map(function(source) {
					console.log('loading from ', source.get('url'));
					source.fetch().then(function(data) {
						console.log("got data > ", data);
						data.map(function(datum) { things_view.collection.add(datum); });
					});
				});
				
			},
			slideOut:function() {
				var this_ = this;
				this.$el.animate({ left: 0 }, function() {	this_.$el.find(".tab").addClass("flip-horizontal"); });
			},
			slideIn:function () {
				var this_ = this;
				this.$el.animate({ left: - this.$el.find(".datapanel").outerWidth() }, function() {
					this_.$el.find(".tab").removeClass("flip-horizontal");
				});
			},
			toggle_data:function() {
				console.log('toggle_data');
				if ( parseInt(this.$el.css('left'),10) === 0 ){	this.slideIn();	} else { this.slideOut();	}
			}			
		});
		// ???
		$("li").mouseover(function(e){
			console.log("e", e);
			$(e.target).animate({
				left: -300 
			});
		});
		// ---		
		var load = function() {
			// prepopulate the thingies
			$(".definitions_url").val("http://"+document.location.host+[basepath,'tests','rooms-and-buildings.rdf'].join('/'));
			$(".url").val("http://"+document.location.host+ [basepath,'tests','events-diary.rdf'].join('/'));
			
			var buildings = new Source({	name: "Buildings", url: $('.definitions_url').val() });
			var events = new Source({ name: "Events", url: $('.url').val() });
			var sbv = new SidebarView({
				sources: [buildings, events],
				el : $('.slidepanel')[0]
			});
		
			$("#mainpanel").click(function(){
				sbv.slideIn();
			});
			console.log('calling render');
			sbv.render();
			console.log(' done rendering ');
			sbv.slideOut();
			// sbv._new_group();
		};
		$('.load').click(load);
		$('form').submit(load);
		load();
	}