function(){
            // Generate quantity field collection from config.
            this.facet_quantity_fields = new Backbone.Collection();
            _.each(GeoRefine.config.facets.quantity_fields, function(field){
                var model = new Backbone.Model(_.extend({}, field));
                this.facet_quantity_fields.add(model);
            }, this);

            // Setup quantity field selector.
            var $select = $('<select></select>');
            _.each(this.facet_quantity_fields.models, function(model){
                var $option = $(_s.sprintf('<option value="%s">%s</option>', model.cid, model.get('label')));
                $option.appendTo($select);
            }, this);
            $select.appendTo('.filters-editor .quantity-field', this.el);

            // When the quantity field selector changes, update the facets and summary bar.
            var _this = this;
            $select.on('change', function(){
                var val = $select.val();
                var selected_field = _this.facet_quantity_fields.getByCid(val);
                _.each(_this.facets.models, function(facet){
                    facet.set('quantity_field', selected_field);
                }, _this);

                _this.summary_bar.model.set('quantity_field', selected_field);
            });

            // Resize the filters editor.
            $('.filters-editor', this.el).height();
        }