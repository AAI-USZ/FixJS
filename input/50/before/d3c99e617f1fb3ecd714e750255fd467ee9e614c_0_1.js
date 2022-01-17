function() {
            /*
            var e = window
                , a = 'inner';
            if ( !( 'innerWidth' in window ) )
            {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return { width : e[ a+'Width' ], height : e[ a+'Height' ]}
            */
            return {height : this.element.parent()[0].scrollHeight, width: this.element.parent().width()};
        }