function(){



	return {



		// relative to this file

		basePath:"../",



		newlineFilter: function(s){

		   // convert all DOS-style newlines to Unix-style newlines

		   return s.replace(/\r\n/g, "\n").replace(/\n\r/g, "\n");

		},



		packages:[

			{

				name:"dojo",

				location:"../dojo"

			},{

				name:"dijit",

				location:"../dijit"

			},{

				name:"dx-alias",

				location:"../dx-alias"

			},{

				name:"dx-timer",

				location:"../dx-timer"

			}

		],



		deps:[

			'../dojo/dojo',

			'../dijit'

		],



		layers:{



			"dx-alias/layer":{

				include:[

					"dx-alias/Widget",

					"dx-alias/dom",

					"dx-alias/groups",

					"dx-alias/has",

					"dx-alias/lang",

					"dx-alias/log",

					"dx-alias/mouse",

					"dx-alias/on",

					"dx-alias/shim",

					"dx-alias/string",

					"dx-alias/topic",

					"dx-alias/parser",



					"dx-timer/timer"

				],

				exclude:[

					"dojo/Deferred",

					"dojo/Evented",

					"dojo/NodeList-dom",

					"dojo/Stateful",

					"dojo/_base/Color",

					"dojo/_base/Deferred",

					"dojo/_base/NodeList",

					"dojo/_base/array",

					"dojo/_base/browser",

					"dojo/_base/config",

					"dojo/_base/connect",

					"dojo/_base/declare",

					"dojo/_base/event",

					"dojo/_base/fx",

					"dojo/_base/html",

					"dojo/_base/json",

					"dojo/_base/kernel",

					"dojo/_base/lang",

					"dojo/_base/loader",

					"dojo/_base/sniff",

					"dojo/_base/unload",

					"dojo/_base/url",

					"dojo/_base/window",

					"dojo/_base/xhr",

					"dojo/aspect",

					"dojo/cache",

					"dojo/date/stamp",

					"dojo/dom",

					"dojo/dom-attr",

					"dojo/dom-class",

					"dojo/dom-construct",

					"dojo/dom-form",

					"dojo/dom-geometry",

					"dojo/dom-prop",

					"dojo/dom-style",

					"dojo/domReady",

					"dojo/errors/CancelError",

					"dojo/errors/RequestError",

					"dojo/errors/RequestTimeoutError",

					"dojo/errors/create",

					"dojo/fx/easing",

					"dojo/has",

					"dojo/io-query",

					"dojo/io/script",

					"dojo/json",

					"dojo/keys",

					"dojo/main",

					"dojo/mouse",

					"dojo/on",

					"dojo/parser",

					"dojo/promise/Promise",

					"dojo/promise/instrumenting",

					"dojo/query",

					"dojo/ready",

					"dojo/request/handlers",

					"dojo/request/script",

					"dojo/request/util",

					"dojo/request/watch",

					"dojo/request/xhr",

					"dojo/selector/_loader",

					"dojo/selector/acme",

					"dojo/sniff",

					"dojo/string",

					"dojo/text",

					"dojo/text",

					"dojo/topic",

					"dojo/touch",

					"dojo/uacss",

					"dojo/when",



					"dijit/Destroyable",

					"dijit/_Container",

					"dijit/_TemplatedMixin",

					"dijit/_WidgetBase",

					"dijit/main",

					"dijit/registry"

				]

			}

		}

	};



}