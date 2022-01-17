function(e){
                        e.preventDefault();
                        var li2 = $(this);
                        if (li2.hasClass('active')) {
                            app.fireEvent('filterTask', { turn: null, list_id: list.id });
                            li2.removeClass('active');
                        } else {
                            app.fireEvent('filterTask', li2.data('filter-condition'));
                            li2.addClass('active');
                        }
                        li2.parent().toggleClass('active-filter', li2.hasClass('active'));
                    }