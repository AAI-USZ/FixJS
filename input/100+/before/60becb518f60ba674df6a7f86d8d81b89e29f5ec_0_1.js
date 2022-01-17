function() {
			var this_ = this;
			this.$el.html(_(this.template).template({label:this.options.label || 'stuff'}));
			this.$el.draggable();
			this.options.views_collection.map(function(v) { this_._add_view(v); });
			this.$el.droppable({
				accept:'.item, .simple',
				tolerance:"touch",
				over:function(event, ui) {
					$(this).addClass("over");
				},
				out:function(event, ui) {
					$(this).removeClass("over");
				},				
				drop: function( event, ui ) {
					$(this).removeClass("over");
					var view = clone_view(ui.draggable.data("view"));
					this_.add(view);
				}
			});
			return this.el;
		}