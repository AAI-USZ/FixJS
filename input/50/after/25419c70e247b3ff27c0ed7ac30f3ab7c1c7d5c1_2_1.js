function(numer, instance) {
                            return numer + (_.contains(responseNames, instance.response[questionName]) ? 1 : 0);
                        }