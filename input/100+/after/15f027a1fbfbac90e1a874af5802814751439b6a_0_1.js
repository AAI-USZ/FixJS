function(as) {
              if (!predicateMap[as[0]]) {
                predicateMap[as[0]] = utils.stringify(as[1]);
                predicateValues[predicateMap[as[0]]] = [];
              }

              // If local was setting not a constant value to the predicate
              // Remove all available information about it (predicate)
              if (as[2] === 'reset') {
                state.unset(predicateMap[as[0]]);
              } else {
                // Update cloned state
                state.set(predicateMap[as[0]], utils.stringify(as[2]));
              }

              if (!predicateChilds[as[0]]) {
                var pred = predicateMap[as[0]];
                predicateChilds[as[0]] = predicateIds.filter(function(id) {
                  if (id === as[0]) return false;
                  return predicateMap[id].indexOf(pred) > 0;
                });
              }

              // Remove all nested predicates from state
              // Like if `as` is `this.x` - remove `this.x.y`
              // see #2 for details
              predicateChilds[as[0]].forEach(function(id) {
                state.unset(predicateMap[id]);
              });
            }