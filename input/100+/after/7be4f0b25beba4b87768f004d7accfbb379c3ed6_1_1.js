function () {
            var filter = App.session.get(this.defaults.name);

            if (filter) {
                var data = {};
                // Display date
                if (this.defaults.ui.dates && filter.date) {
                    var dateInput = $(this.defaults.ui.dates), dateText = $(this.defaults.ui.dates + '-text');

                    dateInput.data('date', filter.date.format(dateInput.data('date-format')));
                    dateInput.data('date-period', filter['date-period']);
                    if (dateInput.data('datepicker')) {
                        dateInput.data('datepicker').update();
                    }

                    var date = filter.date.clone(), text = '', help = '';
                    switch (filter['date-period']) {
                        case 'D':
                            text = date.format('YYYY-MM-DD');
                            data.date = date.format('YYYY-MM-DD');
                            break;
                        case 'W':
                            text = 'Week ' + date.format('w, YYYY');
                            data.date = [date.day(1).format('YYYY-MM-DD'), date.day(7).format('YYYY-MM-DD')];
                            break;
                        case 'M':
                            text = date.format('MMM YYYY');
                            data.date = date.format('YYYY-MM');
                            break;
                        case 'Y':
                            text = date.format('YYYY');
                            data.date = date.format('YYYY');
                            break;
                    }

                    dateInput.attr('title', text);
                    dateText.text(text);
                }

                // Display customer
                if (this.defaults.ui.customers) {
                    if (filter.customer) {
                        this.customerFilter.select(filter.customer);
                        data.customer = filter.customer;
                    } else {
                        this.customerFilter.select('');
                    }
                }

                // Display projects
                if (this.defaults.ui.projects) {
                    if (filter.project) {
                        this.projectFilter.select(filter.project);
                        data.project = filter.project;
                    } else {
                        this.projectFilter.select('');
                    }
                }

                // Display services
                if (this.defaults.ui.services) {
                    if (filter.service) {
                        this.serviceFilter.select(filter.service);
                        data.service = filter.service;
                    } else {
                        this.serviceFilter.select('');
                    }
                }

                // Display search
                if (this.defaults.ui.search) {
                    var searchFilter = $('#filter-search');
                    if (filter.search) {
                        searchFilter.val(filter.search);
                        data.search = filter.search;
                    } else {
                        searchFilter.val();
                    }
                }

                // fetch activities
                this.collection.addFetchData({ filter:data });
            }

            this.collection.resetPager();
            this.collection.load();

            if (filter && filter.open) {
                $('#filter').show();
            }
        }