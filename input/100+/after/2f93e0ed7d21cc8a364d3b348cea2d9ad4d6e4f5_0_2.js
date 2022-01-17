function() {
            var
                stay     = false,
                show     = false,
                day      = 0,
                year     = 0,
                month    = 0,
                raw1     = null,
                raw2     = null,
                tmp      = null,
                human    = null,
                items    = this._nodes.items,
                field    = this._nodes.field,
                params   = this._params,
                tmpl     = params.tmpl,
                mirror   = params.mirror,
                chosen   = items.chosen,
                clicked  = items.clicked,
                tangled  = this._tangled,
                relation = tangled ? tangled.relation : null,
                instance = tangled ? tangled.instance : null;

            // Remove selection from the previous selected item
            if (chosen) {
                chosen.className = chosen.className.replace(' b-cal__day_is_chosen', '');
            }

            // Set the selection to the currently selected item
            chosen = items.chosen = clicked;
            chosen.className += ' b-cal__day_is_chosen';

            // Get the chosen date raw and human objects
            day   = chosen.getAttribute('data-day') - 0;
            year  = chosen.getAttribute('data-year') - 0;
            month = chosen.getAttribute('data-month') - 0;
            raw1  = new Date(year, month, day);
            alias = items.alias = year + '-' +
                                  month + '-' +
                                  day;

            // Set values into tangled calendar`s fields
            if (tangled) {
                items  = instance._nodes.items;
                tmpl   = instance._params.tmpl;
                raw2   = items.chosen ?
                         new Date(
                             items.chosen.getAttribute('data-year'),
                             items.chosen.getAttribute('data-month'),
                             items.chosen.getAttribute('data-day')
                         ) :
                         instance._now;
                if (relation == '>') {
                    // Tangled calendar is larger
                    if (raw1 >= raw2) {
                        show = true;
                        raw2 = new Date(raw1);
                        raw2.setDate(raw2.getDate() + 1);
                    }

                    if (params.block_range) {
                        instance.min(tmp);
                    }
                } else if (relation == '<') {
                    // Tangled calendar is smaller
                    if (raw1 <= raw2) {
                        show = true;
                        raw2 = new Date(raw1);
                        raw1.setDate(raw1.getDate() + 1);
                    }

                    if (params.block_range) {
                        instance.max(tmp);
                    }
                }

                // 
                this.hide();

                instance.jump(raw2);

                //
                human = Cal.human(raw1);

                // Set the selected date into fields
                if (field) {
                    field[this._way] = this._tmpl(tmpl.stdout, human);

                    if (mirror) {
                        mirror.value = this._tmpl(tmpl.mirror, human);
                    }
                }

                // Reset the mousemove event indicator
                if (this._hold) {
                    this._hold = false;
                }

                // Reset the mouseout event timer
                if (this._timer) {
                    clearTimeout(this._timer);
                }

                human  = Cal.human(raw2);
                field  = instance._nodes.field;
                mirror = instance._params.mirror;

                if (field) {
                    field[this._way] = this._tmpl(tmpl.stdout, human);

                    if (mirror) {
                        mirror.value = this._tmpl(tmpl.mirror, human);
                    }

                    if (show) {
                        field.focus();
                    }
                }
            }

            return this;
        }