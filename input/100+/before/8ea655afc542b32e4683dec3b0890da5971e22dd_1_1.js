function(){ 



    homeTable = $("#showListTable").dataTable({

		// pupulate it with ajax

        "sAjaxSource": json_url,

        "sAjaxDataProp": "shows",



		// disable most stuff for the shows table

        "bPaginate": false,

        "bInfo": false,

        "bFilter": false,

        "bAutoWidth": false,

        "bProcessing": false,



		// only show the basic DOM elements

		"sDom": "lftipr",

        "bJQueryUI": true,



		// use localstorage to save state

		"bStateSave": true,

		"fnStateSave": function (oSettings, oData) {

			localStorage.setItem( 'DataTables_'+window.location.pathname, JSON.stringify(oData) );

		},

		"fnStateLoad": function (oSettings) {

			var data = localStorage.getItem('DataTables_'+window.location.pathname);

			return JSON.parse(data);

		},



        "aoColumnDefs": [

        	{ "sClass": "center", "aTargets": [0, 2, 3, 4, 5, 6] },



			// Date

			{

				"sType": "empty-last",

            	"aDataSort": [0, 1],

                "aTargets": [ 0 ]

			},				



			// Title

            {

				"sType": "titles",

				"sClass": "tvShow",

				

				// render the show name as a link

                "fnRender": function ( oObj, sVal ) {

                	if (oObj.aData["tvdb_id"] == 0)

                		return sVal;

                	return '<a href="'+sbRoot+'/home/displayShow?show=' + oObj.aData["tvdb_id"] + '">' + oObj.aData["name"] + '</a>';

                },

                "aTargets": [ 1 ]

            },



			// Quality

            {

            	// sort the quality in the correct order and secondarily by name

				"sType": "quality",

            	"bUseRendered": false,

            	"aDataSort": [3, 1],



            	// render the quality in a span

                "fnRender": function ( oObj, sVal ) {

                	return '<span class="quality '+sVal+'">'+sVal+'</span>';

                },

                "aTargets": [ 3 ]

            },



			// Downloads

            {

            	// render the download count as a progress bar

            	"bUseRendered": false,

                "fnRender": function ( oObj, sVal ) {

                	return buildProgressHTML(oObj.aData["tvdb_id"], oObj.aData["percent_downloaded"], oObj.aData["num_downloaded"], oObj.aData["num_eps"]);

                },

                "aTargets": [ 4 ]

            },



			// Active

            {            	

            	// sort the name column with the active column

            	"aDataSort": [5, 1],

            	"sType": "alt-string",

            	

            	// render the Active column as an image

                "fnRender": function ( oObj, sVal ) {

                	var img = '<img src="'+sbRoot+'/images/';

                    if (sVal == true) {

                    	img += 'yes16.png" alt="Y"';

                    } else {

                    	img += 'no16.png" alt="N"';

	                }

	                img += 'width="16" height="16" />';

                    return img;

                },

                "aTargets": [ 5 ]

            },



			// Status

			{

				// sort it with the name column

            	"aDataSort": [6, 1],

            	"aTargets": [6]

			},

    	],

        "aoColumns": [

            { "mDataProp": "next_airdate" },

            { "mDataProp": "name" },

            { "mDataProp": "network" },

            { "mDataProp": "quality_string" },

            { "mDataProp": "percent_downloaded" },

            { "mDataProp": "active" },

            { "mDataProp": "status" }

        ]

    });

	

	// start watching the show list crcs

    check_crc();

}