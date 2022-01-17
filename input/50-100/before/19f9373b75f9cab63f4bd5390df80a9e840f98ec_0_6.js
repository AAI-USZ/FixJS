function(n, i){
                return ( $(n).attr('name').match(/^localips\d+$/) && $(n).val().length > 0 );
            }).map(function(n){return $(n).val()}