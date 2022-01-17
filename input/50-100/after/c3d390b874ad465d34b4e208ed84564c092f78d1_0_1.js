function(dselectors, dcallback, dcontext, dmatching) {
                if( dselectors === selectors && 
                    dcallback === callback && 
                    dcontext === context &&
                    arrays_equal(dmatching, matching)
                ) {
                    console.log(dmatching, matching);
                    call_for_matching(function(value) {
                        value.die(rest, dcallback, dcontext, extend_array(dmatching, value))
                    });
                    this.off(event_name, event_callback, this);
                    this.off('backbrace:die:' + selectors, die, this);
                }
            }