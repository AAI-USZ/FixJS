function(result, container, query) {
                    var markup=[];
                    markMatch(result.text, query.term, markup);
                    return markup.join("");
                }