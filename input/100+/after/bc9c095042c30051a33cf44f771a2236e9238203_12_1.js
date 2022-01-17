function () {
            var sortSelection = this.options[this.selectedIndex].value;
            if (sortSelection === 'desc') {
                mymemberships.sortOrder = 'desc';
                $.bbq.pushState({'mso': 'desc'});
            } else if (sortSelection === 'asc') {
                mymemberships.sortOrder = 'asc';
                $.bbq.pushState({'mso': 'asc'});
            } else {
                mymemberships.sortOrder = 'modified';
                $.bbq.pushState({'mso': 'modified'});
            }
            doInit();
        }