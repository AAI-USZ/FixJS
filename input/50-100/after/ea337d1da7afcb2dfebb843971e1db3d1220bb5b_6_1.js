function(item) {
					if (this.emptyView) this.emptyView.dealloc();

					var view = new ItemView( {model: item} );
					this.$el[that.options.listMethod]( view.render().el );

					return this;
				}