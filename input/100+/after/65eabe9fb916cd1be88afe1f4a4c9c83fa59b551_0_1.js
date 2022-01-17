function () {
        var self = this;
        this.selectedResource      = null;
        this.selectedResourceLabel = null;
        this.searchTerm            = '';
        this.ongoingSearches       = 0;
        this.searchResults         = [];
        this.rangePattern          = '';

        this._domReady     = false;
        this._pluginLoaded = false;
        this._initialized  = false;
        this._autocomplete = null;

        this.labels = [
            'http://www.w3.org/2000/01/rdf-schema#label',
            'http://www.w3.org/2004/02/skos/core#prefLabel',
            'http://xmlns.com/foaf/0.1/name'
        ];

        this._namespaces = jQuery.extend({
            foaf: 'http://xmlns.com/foaf/0.1/',
            dc:   'http://purl.org/dc/terms/',
            owl:  'http://www.w3.org/2002/07/owl#',
            rdf:  'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
            rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
            skos: 'http://www.w3.org/2004/02/skos/core#',
            geo:  'http://www.w3.org/2003/01/geo/wgs84_pos#',
            dbp:  'http://dbpedia.org/property/',
            xsd:  'http://www.w3.org/2001/XMLSchema#',
            sioc: 'http://rdfs.org/sioc/ns#'
        }, RDFauthor.namespaces());

        /* default options */
        this._options = jQuery.extend({
            // Autocomplete options:
            minChars:           3,      /* minmum chars needed to be typed before search starts */
            delay:              1000,   /* delay in ms before search starts */
            max:                9,      /* maximum number of results */
            maxResults:         3,      /* maximum number of results per source */
            // Source options:
            local:              false,  /* Local property cache */
            sparql:             true,   /* use SPARQL endpoint */
            //sindice:           true,   /* use Sindice semantic search */
            uri:                true,   /* provide generated URI */
            // Filter options:
            filterRange:        true,   /* show only resources in the rdfs:range of the statement's property */
            filterDomain:       false,  /* show only properties whose domain matches the statement's subject */
            filterProperties:   false,  /* show only resources used as properties */
            // Callbacks
            selectionCallback:  null,   /* the function to be called when a new selection is made */
            selectOnReturn:     false   /* executes selection callback if the user hits return in the search field */

        }, this.options);


        // check conflicting and implied options
        if (this._options.filterRange) {
            this._options.filterDomain     = false;
            this._options.filterProperties = false;
            this.getRange(function(rangePattern) {
                self.rangePattern = rangePattern;
            })
        } else if (this._options.filterDomain) {
            this._options.filterRange      = false;
            this._options.filterProperties = true;
        }

        // search sources appearence config
        this.sources = {
            local:      {label: 'Local result',     color: '#efe',  border: '#e3ffe3',  rank: 0},
            sparql:     {label: 'Local result',         color: '#efe', border: '#e3ffe3', rank:  1},
            sparqlmm:   {label: 'Possible domain violation',      color: '#fee', border: '#ffe3e3', rank:  2},
            sindice:    {lael: 'Sindice result',       color: '#eef', border: '#e3e3ff', rank:  6},
            uri:        {label: 'Auto-generated URI',   color: '#eee', border: '#e3e3e3', rank:  8}
        }

        var self = this;
        if (undefined === jQuery.ui.autocomplete) {
            RDFauthor.loadScript(RDFAUTHOR_BASE + 'libraries/jquery.ui.autocomplete.js', function () {
                self._pluginLoaded = true;
                self._initAutocomplete();
            });
        } else {
            self._pluginLoaded = true;
            self._initAutocomplete();
        }

        // jQuery UI styles
        RDFauthor.loadStylesheet(RDFAUTHOR_BASE + 'libraries/jquery.ui.autocomplete.css');

        // load stylesheets
        RDFauthor.loadStylesheet(RDFAUTHOR_BASE + 'src/widget.resource.css');
    }