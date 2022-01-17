function (options) {
	
	var defaults = {
		/* you can pass an array of URLs which are then tried sequentially */
		url: ["http://dev.iks-project.eu/stanbolfull"],
		timeout : 20000 /* 20 seconds timeout */,

        enhancer : {
            urlPostfix : "/enhancer",
            chain : "default"
        },
        contenthub : {
            urlPostfix : "/contenthub",
            index : "contenthub"
        },
        entityhub : {
            /* if set to undefined, the Referenced Site Manager @ /entityhub/sites is used. */
            /* if set to, e.g., dbpedia, referenced Site @ /entityhub/site/dbpedia is used. */
            site : undefined,
            urlPostfix : "/entityhub",
            local : false
        },
        factstore : {
            urlPostfix : "/factstore"
        },
        ontonet : {
            urlPostfix : "/ontonet",
            scope: "/ontology",
            session: "/session",
            registry: "/registry"
        },
        rules : {
            urlPostfix : "/rules",
            recipe : "/recipe",
            findRule : "/find/rules",
            findRecipe : "/find/recipes"
        },
        sparql : {
            urlPostfix : "/sparql"
        }
	};
	
    /* the options are merged with the default options */
    this.options = jQuery.extend(true, defaults, options ? options : {});
    this.options.url = (_.isArray(this.options.url))? this.options.url : [ this.options.url ];
    
    this._init();
}