function () {
            addBinding();
            currentQuery = $.bbq.getState('mq') || '';
            $('#mymemberships_livefilter').val(currentQuery);
            mymemberships.sortOrder = $.bbq.getState('mso') || 'modified';
            $('#mymemberships_sortby').val(mymemberships.sortOrder);
            mymemberships.listStyle = $.bbq.getState('ls') || 'list';

            handleHashChange();
        }