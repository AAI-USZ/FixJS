function() {
                    if (opts.onChange) {
                      opts.onChange.apply(this, [result]);
                    }
                    result.docs_written++;
                    pending--;
                    isCompleted();
                  }