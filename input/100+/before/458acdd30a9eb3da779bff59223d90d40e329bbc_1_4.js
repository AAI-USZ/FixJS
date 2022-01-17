function() {
            var sort = $(this).attr('sort');
            if (current_sort == sort) {
                current_sort_reverse = ! current_sort_reverse;
            }
            else {
                current_sort = sort;
                current_sort_reverse = false;
            }
            update();
        }