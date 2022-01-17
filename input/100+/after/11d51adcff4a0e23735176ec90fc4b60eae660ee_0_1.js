function(e) {

            var $button = $(this);
            var $button_container = $button.parent();
            var button_properties = read_button($button_container.attr('class').split(' '));
            var selected = button_properties.selected;
            var button_segment = button_properties.segment;


            $button.addClass('btn-primary');
            if (!selected) {

                $buttons.parent().removeClass('selected-0').removeClass('selected-1').removeClass('selected-2')
                $button_container.addClass('selected-' + button_segment)

                $buttons.removeClass('btn-primary');
                $button.addClass('btn-primary');

                var sorting_type = determine_sort($controls.eq(1).find('a'));
                var sorting_kind = determine_kind($controls.eq(0).find('a'));
                if (sorting_kind == 'all') {
                    var $filtered_data = $data.find('.feature');
                } else {
                    var $filtered_data = $data.find('.feature.' + sorting_kind);
                }

                if (sorting_type == 'name') {
                    var $sorted_data = $filtered_data.sorted({
                        by: function(v) {
                            return $(v).find('.feature-title').text().toLowerCase();
                        }
                    });
                } else {
                    var $sorted_data = $filtered_data.sorted({
                        by: function(v) {
                            return parseFloat($(v).data(sorting_type));
                        }
                    });
                    
                }
                $list.quicksand($sorted_data, $preferences);

            }

            e.preventDefault();
        }