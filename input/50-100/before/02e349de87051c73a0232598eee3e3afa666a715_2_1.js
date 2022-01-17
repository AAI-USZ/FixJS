function( e ){
                switch ( e.keyCode ){
                    // Next: 74 = j, 40 = down arrow
                    case 40:
                    case 74:
                        e.preventDefault();
                        v.hasNext() && v.setScrollPosition( v.getNext().$el.offset().top + 1 );
                        break;

                    // Prev: 75 = k, 38 = up arrow
                    case 38:
                    case 75:
                        e.preventDefault();
                        v.hasPrev() && v.setScrollPosition( v.getPrev().$el.offset().top - 1 );
                        break;
                }
            }