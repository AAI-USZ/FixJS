function (macro_errors) {
                    // Assemble the body of the response, and we're done.
                    var result = _.map(tokens, function (tok) {
                        if ('TEXT' == tok.type) {
                            return tok.out;
                        } else if ('MACRO' == tok.type) {
                            return macros[tok.hash].out;
                        }
                    }).join('');
                    var errors = [].concat(tmpl_errors, macro_errors);
                    $this.emit('end');
                    process_done(errors.length ? errors : null, result);
                }