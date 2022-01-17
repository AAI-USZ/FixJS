function(result, j) {
                        return {
                          intertype: 'mathop',
                          op: value.op,
                          variant: value.variant,
                          type: 'i' + otherElements[j].bits,
                          params: [
                            result,
                            { intertype: 'value', ident: otherElements[j].ident, type: 'i' + otherElements[j].bits }
                          ]
                        };
                      }