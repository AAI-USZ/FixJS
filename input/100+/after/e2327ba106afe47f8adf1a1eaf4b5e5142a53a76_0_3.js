function() {
            var
                stay     = false,
                day      = 0,
                year     = 0,
                month    = 0,
                relation = '',
                min      = null,
                max      = null,
                tmp      = null,
                field    = null,
                check    = null,
                human    = null,
                items    = this._nodes.items,
                alias    = items.alias,
                chosen   = items.chosen,
                clicked  = items.clicked,
                instance = null;

            // Remove selection from previous selected item
            if (chosen) {
                chosen.className = chosen.className.replace(' b-cal__day_is_chosen', '');

                if (chosen.getAttribute('data-stay')) {
                    stay = true;

                    chosen.removeAttribute('data-stay');
                }
            }

            // Select new item
            chosen = items.chosen = clicked;
            day    = chosen.getAttribute('data-day') - 0;
            year   = chosen.getAttribute('data-year') - 0;
            month  = chosen.getAttribute('data-month') - 0;
            tmp    = new Date(year, month, day);
            alias  = items.alias = year + '-' +
                                   month + '-' +
                                   day;

            chosen.className += ' b-cal__day_is_chosen';

            human  = Cal.human(tmp);
            field  = this._nodes.field;
            mirror = this._params.mirror;

            // Set date to a main fields
            if (field) {
                field[this._way] = this._tmpl(
                    this._params.tmpl.stdout,
                    human
                );

                if (mirror) {
                    mirror[this._way] = this._tmpl(
                        this._params.tmpl.mirror,
                        human
                    );
                }
            }

            // Move range in tied calendar instance
            if (this._tangled) {
                instance = this._tangled.instance;
                relation = this._tangled.relation;
                field    = instance._nodes.field;
                mirror   = instance._params.mirror;
                check    = field[this._way] != '' ? Cal.parse(field[this._way]) : null;

                //
                if (self._hold) {
                    self._hold = false;
                }

                if (relation == '>') {
                    max = this._max;

                    if (tmp >= max) {
                        check = max;
                        tmp   = new Date(
                            check.getFullYear(),
                            check.getMonth(),
                            check.getDate() - 1
                        );
                    } else if (tmp >= check) {
                        check = new Date(
                            tmp.getFullYear(),
                            tmp.getMonth(),
                            tmp.getDate() + 1
                        );
                    }

                    instance.min(tmp);
                    instance.show();
                    instance.jump(tmp);
                } else if (relation == '<') {
                    min = this._min;

                    if (tmp <= min) {
                        check = min;
                        tmp = new Date(
                            check.getFullYear(),
                            check.getMonth(),
                            check.getDate() + 1
                        );
                    } else if (tmp <= check) {
                        check = new Date(
                            tmp.getFullYear(),
                            tmp.getMonth(),
                            tmp.getDate() - 1
                        );
                    }

                    instance.max(tmp);
                }
                // Save date to a tangled fields
                if (field && check) {
                    human = Cal.human(check);

                    field[this._way] = this._tmpl(
                        instance._params.tmpl.stdout,
                        human
                    );

                    if (mirror) {
                        mirror[this._way] = this._tmpl(
                            instance._params.tmpl.mirror,
                            human
                        );
                    }
                }

                this.hide();
            }

            return this;
        }