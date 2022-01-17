function(pos) {
            pos = pos || {};

            var
                alias  = '',
                now    = null,
                min    = this._params.min_date,
                max    = this._params.max_date,
                block  = this._nodes.block,
                field  = this._nodes.field,
                ignore = this._params.offset_ignore,
                offset = this._offsetize(field);

            // Try to use user given offset properties
            for (alias in offset) {
                if (!pos[alias]) {
                    pos[alias] = offset[alias];
                }
            }

            // Try to read a date from field
            if (field && field[this._way] != '') {
                now = new Date(
                    field.getAttribute('data-year'),
                    field.getAttribute('data-month'),
                    field.getAttribute('data-day')
                );
            } else {
                now = this._params.now_date;
            }

            // Change indicator
            this.shown = true;

            // Draw DOM for a chosen calendar
            this._draw(now);

            // Apply offset properties
            if (ignore !== true && ignore != 'all') {
                if (ignore != 'top') {
                    block.style.top = (pos.top + pos.height) + 'px';
                }

                if (ignore != 'left') {
                    block.style.left = pos.left + 'px';
                }
            }

            // Hide tangled calendar
            if (this._tangled) {
                this._tangled.instance.hide();
            }

            // Add visibility class
            this._nodes.block.className += ' b-cal_is_visible';

            return this;
        }