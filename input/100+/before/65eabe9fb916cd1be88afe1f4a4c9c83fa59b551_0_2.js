function (searchTerm, responseCallback) {
        this.searchResults = [];
        var self = this;

        if (this._options.sparql) {
            // SPARQL endpoint
            var prologue      = '\
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>';
            var uriPattern    = '?uri ?v1 ?literal .\n';
            var propertyPattern = '';
            var domainPattern = 'OPTIONAL {?uri rdfs:domain ?domain .}\n';
            var rangePattern  = '';
            var typePattern   = 'OPTIONAL {<' + self.statement.subjectURI() + '> a ?type . }'

            if (this._options.filterProperties) {
                propertyPattern = '{?v2 ?uri ?v3 .} UNION {?uri a rdf:Property .}';
            }

            if (this._options.filterRange) {
                var range = RDFauthor.infoForPredicate(self.statement.predicateURI(), 'range');
                if ( (range.length > 0) && (range != 'http://www.w3.org/2002/07/owl#Thing') ) {
                    rangePattern = '?uri a <' + range.join('> .\n?uri a <') + '> .\n';
                }
            }

            var query = prologue + '\nSELECT DISTINCT ?uri ?literal ?domain ?type\
                FROM <' + this.statement.graphURI() + '>\
                WHERE {\
                    ' + uriPattern + '\
                    ' + propertyPattern + '\
                    ' + domainPattern + '\
                    ' + rangePattern + '\
                    ' + typePattern + '\
                    FILTER (\
                        isURI(?uri) \
                        && isLITERAL(?literal) \
                        && REGEX(?literal, "' + searchTerm + '", "i") \
                        && REGEX(?literal, "^.{1,' + MAX_TITLE_LENGTH + '}$"))\
                }\
                LIMIT ' + this._options.maxResults;

            // TODO: if domain is bound, check if current subject is an instance of it

            RDFauthor.queryGraph(this.statement.graphURI(), query, {
                callbackSuccess: function (data) {
                    var sparqlResults = [];
                    if (data && data['results'] && data['results']['bindings']) {
                        var bindings  = data['results']['bindings'];
                        var resources = {};

                        for (var i = 0, max = bindings.length; i < max; i++) {
                            var binding = bindings[i];
                            if (binding['uri']) {
                                var current = binding['uri'];
                                if (current.type == 'uri') {
                                    var uri = current.value;
                                    var label;

                                    if (binding['literal']) {
                                        label = binding['literal']['value'];
                                    }

                                    if (undefined == resources[uri]) {
                                        resources[uri] = true;

                                        var domain = binding['domain'];
                                        var type   = binding['type'];

                                        if (domain && type) {
                                            if (domain['value'] != type['value']) {
                                                sparqlResults.push({
                                                    source: 'sparqlmm',
                                                    value:  uri,
                                                    label:  label
                                                });
                                            } else {
                                                sparqlResults.push({
                                                    source: 'sparql',
                                                    value:  uri,
                                                    label:  label
                                                });
                                            }
                                        } else {
                                            sparqlResults.push({
                                                source: 'sparql',
                                                value:  uri,
                                                label:  label
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }

                    self.results(sparqlResults, responseCallback, 'sparql');
                }
            });
            this.ongoingSearches++;
        }

        // Sindice search
        if (this._options.sindice) {
            jQuery.ajax({
                timeout: 10,
                dataType: 'json',
                url: 'http://api.sindice.com/v2/search?callback=?',
                data: {
                    qt: 'term',
                    page: 1,
                    format: 'json',
                    q: encodeURIComponent(searchTerm)
                },
                error: function (request, status, error) {
                    self.results([], responseCallback);
                },
                success: function (data, status) {
                    var sindiceResults = [];
                    for (var i = 0; i < Math.min(data.entries.length, self._options.maxResults); ++i) {
                        var current = data.entries[i];
                        var title   = String(current.title);

                        if (title.length > MAX_TITLE_LENGTH) {
                            var searchPos = title.search(RegExp(self.searchTerm, 'i'));
                            if (searchPos > -1) {
                                var leftSplit  = Math.max(title.lastIndexOf(',', searchPos) + 1, 0);
                                var rightSplit = title.indexOf(',', searchPos);
                                title = title.substring(leftSplit, rightSplit > -1 ? rightSplit : title.length);
                            }
                        }

                        sindiceResults.push({
                            source: 'sindice',
                            value: String(current.link),
                            label: title
                        });
                    }

                    self.results(sindiceResults, responseCallback, 'sindice');
                }
            })
            this.ongoingSearches++;
        }

        // static URI
        if (this._options.uri) {
            this.ongoingSearches++;
            this.results([{
                source: 'uri',
                value: this.generateURI(searchTerm, this.statement.graphURI()),
                label: searchTerm
            }], responseCallback, 'uri');
        }

        if (this._options.local) {
            this.ongoingSearches++;
            var results = [],
                searchResults = RDFauthor.searchCacheByLabel(searchTerm);
            for (var i = 0; i < searchResults.length; i++) {
                results.push({
                    source: 'local',
                    value: searchResults[i]['uri'],
                    label: searchResults[i]['label'],
                });
            };
            // Add results to global callback
            this.results(results, responseCallback, 'local');
        };
    }