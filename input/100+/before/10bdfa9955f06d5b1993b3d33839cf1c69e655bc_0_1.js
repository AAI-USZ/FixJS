function(attr){
                outer_q['GROUP_BY'].push({
                    'ID': key[attr]['ID'],
                    'EXPRESSION': _s.sprintf("{{inner.%s}}", key[attr]['ID'])
                });
            }