function (evt) {
        if (this.result_highlight) {
            var high = this.result_highlight, high_id = high.id;
            this.result_clear_highlight();

            var position = high_id.substr(high_id.lastIndexOf("_") + 1);

            var item = this.results_data[position];

            if (this.is_multiple && item.group && this.options.batch_select) {
                // assume multiple
                var siblings = dojo.query(high).nextAll();

                var index = 0;

                while(siblings[index] && !dojo.hasClass(siblings[index], "group-result-selectable")) {
                    if (dojo.hasClass(siblings[index], "active-result")) {


                        var sibling = siblings[index];
                        var sibling_id = sibling.id;
                        var sibling_position = sibling_id.substr(sibling_id.lastIndexOf("_") + 1);
                        var sibling_item = this.results_data[sibling_position];
                        sibling_item.selected = true;
                        this.form_field.options[sibling_item.options_index].selected = true;

                        this.result_deactivate(sibling);

                        dojo.addClass(sibling, "result-selected");

                        this.choice_build(sibling_item);
                    }

                    index++;
                }
            } else {
                if (this.is_multiple) {
                    this.result_deactivate(high);
                } else {
                    var selected = dojo.query(this.search_results, '.result-selected').shift();

                    if (selected) {
                        dojo.removeClass(selected, "result-selected");
                    }
                    this.result_single_selected = high;
                }

                dojo.addClass(high, "result-selected");

                item.selected = true;
                this.form_field.options[item.options_index].selected = true;

                if (this.is_multiple) {
                    this.choice_build(item);
                } else {
                    dojo.query('span', this.selected_item).shift().innerHTML = item.text;
                    if (this.options.allow_single_deselect) {
                        this.single_deselect_control_build();
                    }
                }
            }

            if (!this.is_multiple || !evt.control) {
                this.results_hide();
            }
            dojo.setAttr(this.search_field, 'value', "");
            this.dojo_fire_event("change");

            this.search_field_scale();
        }
    }