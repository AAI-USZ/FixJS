function() {
				var sourcec = new SourceCollection(this.options.sources);
				this.$el.find(".sources").append(new SourcesView({
					el: this.$el.find(".sources ul"),
					collection:sourcec
				}).render().el);
				
				var things_view = new tv.TableView({
					el:this.$el.find('table')[0],
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
						data.map(function(datum) { things_view.add(datum); });
					});
				});
				
			}