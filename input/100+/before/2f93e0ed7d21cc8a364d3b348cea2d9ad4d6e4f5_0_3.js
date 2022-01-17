function(now, pre) {
            pre = pre || false;

            var
                check     = false,
                choose    = false,
                select    = false,
                holiday   = false,
                day       = 0,
                year      = 0,
                month     = 0,
                alias     = '',
                origin    = this._now.getFullYear() + '-' +
                            this._now.getMonth() + '-' +
                            this._now.getDate(),
                preorigin = now.getFullYear() + '-' +
                            now.getMonth() + '-' +
                            now.getDate(),
                tangled   = '',
                min       = this._min,
                max       = this._max,
                tmp       = null,
                node      = null,
                nodes     = this._nodes,
                data      = this._data = Cal.count(now),
                hat       = Cal.human(data.curr.raw),
                list      = nodes.items.list = [],
                tmpl      = this._params.tmpl,
                selected  = this._nodes.items.alias,
                holidays  = this._holidays;

            // Select tangled selection
            if (this._tangled && this._tangled.instance._nodes.items.alias) {
                tangled = this._tangled.instance._nodes.items.alias;
                tmp     = tangled.split('-');

                // Switch to the next or previous month if tangled selection is the first
                // or the last day of month
                if (tmp[0] == data.curr.year && tmp[1] == data.curr.month) {
                    if (this._tangled.relation == '<' && tmp[2] == data.curr.end) {
                        return this.next();
                    } else if (this._tangled.relation == '>' && tmp[2] == 1) {
                        return this.prev();
                    }
                }
            }

            // Clean previous calendar days
            nodes.days.innerHTML = '';

            // Set calendar`s hat value
            nodes.month.innerHTML = this._tmpl(tmpl.hat, hat);

            // Days in past
            year  = data.prev.year;
            month = data.prev.month;
            alias = year + '-' + month + '-';
            check = Cal.inside(
                new Date(
                    year,
                    month,
                    data.prev.till
                ),
                min,
                max
            );

            nodes.prev.title     = (check ? this._tmpl(tmpl.prev, this.human(data.prev.raw, this._lang)) : '');
            nodes.prev.className = 'b-cal__prev' + (check ? '' : ' b-cal__prev_is_disabled');

            for (day = data.prev.from; day <= data.prev.till; day++) {
                holiday = Cal.holiday(year, month, day);

                node = this._day2node(day, month, year, 'past', check, false, holiday, tangled);

                nodes.days.appendChild(node);

                nodes.items.list.push(node);
            }

            // Days in presence
            year  = data.curr.year;
            month = data.curr.month;
            alias = year + '-' + month + '-';

            for (day = data.curr.from; day <= data.curr.till; day++) {
                choose  = false;
                select  = false;
                check   = this.inside(
                    new Date(
                        year,
                        month,
                        day
                    ),
                    min,
                    max
                );

                holiday = Cal.holiday(year, month, day);

                //
                if (check && alias + day == origin) {
                    choose = true;
                }

                //
                if (alias + day == selected || pre && alias + day == preorigin) {
                    select = true;
                }

                node = this._day2node(day, month, year, 'presence', check, choose, holiday, tangled);

                nodes.days.appendChild(node);

                if (select) {
                    node.setAttribute('data-stay', 'on');
                    node.click();
                }

                list.push(node);
            }

            // Days in future
            year  = data.next.year;
            month = data.next.month;
            check = this.inside(
                new Date(
                    data.next.year,
                    data.next.month,
                    data.next.from
                ),
                min,
                max,
                true
            );

            nodes.next.title     = (check ? this._tmpl(tmpl.next, this.human(data.next.raw, this._lang)) : '');
            nodes.next.className = 'b-cal__next' + (!check ? ' b-cal__next_is_disabled' : '');

            for (day = data.next.from; day <= data.next.till; day++) {
                holiday = Cal.holiday(year, month, day);

                node = this._day2node(day, month, year, 'future', check, false, holiday, tangled);

                nodes.days.appendChild(node);

                list.push(node);
            }

            return true;
        }