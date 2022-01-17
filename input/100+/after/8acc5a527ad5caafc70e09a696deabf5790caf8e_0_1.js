function() {

            // Get use-DC as boolean.
            var useDc = Boolean(parseInt(this._data.use_dc_metadata, 10));
            var showBubble = Boolean(parseInt(this._data.show_bubble, 10));

            // Update title.
            this.title.val(this._data.title);
            this.titleEditor.updateFrame().refresh();

            // Update description.
            this.description.val(this._data.description);
            this.descriptionEditor.updateFrame().refresh();

            // If use-DC is activated, disable text editors.
            if (useDc) this._disableTextEditors();
            else this._enableTextEditors();

            // Populate inputs.
            this.slug.val(this._data.slug);
            this.useDcData.prop('checked', useDc);
            this.showBubble.prop('checked', showBubble);
            this.vectorOpacity.val(this._data.vector_opacity);
            this.selectOpacity.val(this._data.select_opacity);
            this.strokeOpacity.val(this._data.stroke_opacity);
            this.graphicOpacity.val(this._data.graphic_opacity);
            this.strokeWidth.val(this._data.stroke_width);
            this.pointRadius.val(this._data.point_radius);
            this.pointImage.val(this._data.point_image);
            this.leftPercent.val(this._data.left_percent);
            this.rightPercent.val(this._data.right_percent);
            this.startDate.val(this._data.start_date);
            this.endDate.val(this._data.end_date);
            this.startVisibleDate.val(this._data.start_visible_date);
            this.endVisibleDate.val(this._data.end_visible_date);

            // Reposition the draggers.
            this.ambiguity.gradientbuilder(
                'positionMarkers',
                this._data.left_percent,
                this._data.right_percent);

            // Set the gradient builder color.
            this.ambiguity.gradientbuilder(
                'setColor',
                this._data.vector_color);

            // Push the new colors onto the pickers. Need to set the global
            // _opened tracker to circumvent miniColors' automatic firing of
            // the change callback on value set.
            this._opened = true;
            this.vectorColor.miniColors('value', this._data.vector_color);
            this.strokeColor.miniColors('value', this._data.stroke_color);
            this.highlightColor.miniColors('value', this._data.highlight_color);
            this._opened = false;

            // Populate the non parent record option.
            this.parentRecord.empty();
            var noneOption = $('<option />').val('none').text('-');
            this.parentRecord.append(noneOption);

            // Populate the rest of the list.
            _.each(this._records, _.bind(function(val, key) {
                var option = $('<option />').val(key).text(val);
                this.parentRecord.append(option);
            }, this));

            // Set the value.
            this.parentRecord.val(this._data.parent_record_id);

        }