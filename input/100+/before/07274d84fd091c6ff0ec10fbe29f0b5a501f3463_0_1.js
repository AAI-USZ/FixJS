function(data_view, opts){
			opts = opts || {};
			$data_views = $('.data-views', this.el);
			var dv_offset = $data_views.offset();

			var w =  new Windows.views.WindowView({
				model: new Backbone.Model(_.extend({}, {
					"inline-block": true,
					"width": $data_views.width(),
					"height": $data_views.height(),
					"x": dv_offset.left,
					"y": dv_offset.top,
					"showFooter": false,
					"scrollable": false
				}, opts))
			});

			w.on("resize", function(){
				Util.util.fillParent(data_view.el);
				data_view.trigger('resize');
			});

			w.on("resizeStop", function(){
				data_view.trigger('resizeStop');
				Util.util.unsetWidthHeight(data_view.el);
			});
			w.on("dragStop", function(){data_view.trigger('pagePositionChange');});
			w.on("minimize", function(){data_view.trigger('deactivate');});
			w.on("cascade", function(){data_view.trigger('activate');});
			w.on("close", function(){
                data_view.trigger('remove');
                w.model = null;
                w.remove();
            });

			$(w.getBody()).append(data_view.el);
			w.resize();
			w.resizeStop();
			data_view.trigger('ready');
		}