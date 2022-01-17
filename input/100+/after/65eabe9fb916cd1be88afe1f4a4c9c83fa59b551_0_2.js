function(responseCallback) {
        var self = this;
        var rangePattern = '';
        var rangeQuery = '\
            SELECT ?range\
            WHERE {\
                <' + self.statement.predicateURI() +'> <http://www.w3.org/2000/01/rdf-schema#range> ?range .\
            }';
        RDFauthor.queryGraph(this.statement.graphURI(), rangeQuery, {
            callbackSuccess: function(data) {
                range = data['results']['bindings'];
                if (range.length != 0) {
                    $(range).each(function(i) {
                        rangePattern += '?uri a <' + range[i]['range'].value + '> . \n';
                    });
                }
                if ($.isFunction(responseCallback)) {
                    responseCallback(rangePattern);
                }
            },
            callbackError: function () {
                if ($.isFunction(responseCallback)) {
                    responseCallback(rangePattern);
                }
            }
        });
    }