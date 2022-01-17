function(numer, instance) {
                            if(reduce_fn(instance)) {
                                return numer + 1;
                            } else return numer;
                        }