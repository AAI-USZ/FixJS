function() {
        var oTable,
        	historyContentDiv = $("#history_content"),
        	historyTableDiv = historyContentDiv.find("#history_table"),
        	tableHeight = historyContentDiv.height() - 200,
        	fnServerData;
        	
        fnServerData = function ( sSource, aoData, fnCallback ) {
        	
        	if (fnServerData.hasOwnProperty("start")) {
    			aoData.push( { name: "start", value: fnServerData.start} );
    		}
    		if (fnServerData.hasOwnProperty("end")) {
    			aoData.push( { name: "end", value: fnServerData.end} );
    		}
           
            aoData.push( { name: "format", value: "json"} );
            
            $.ajax( {
                "dataType": 'json',
                "type": "GET",
                "url": sSource,
                "data": aoData,
                "success": fnCallback
            } );
        };
        
        oTable = historyTableDiv.dataTable( {
            
            "aoColumns": [
               {"sTitle": "Title", "mDataProp": "title", "sClass": "his_title"}, /* Title */
               {"sTitle": "Creator", "mDataProp": "artist", "sClass": "his_artist"}, /* Creator */
               {"sTitle": "Played", "mDataProp": "played", "sClass": "his_artist"}, /* times played */
               {"sTitle": "Length", "mDataProp": "length", "sClass": "his_length library_length"}, /* Length */
               {"sTitle": "Composer", "mDataProp": "composer", "sClass": "his_composer"}, /* Composer */
               {"sTitle": "Copyright", "mDataProp": "copyright", "sClass": "his_copyright"} /* Copyright */
            ],
                          
            "bProcessing": true,
            "bServerSide": true,
            "sAjaxSource": "/Playouthistory/playout-history-feed",
            "sAjaxDataProp": "history",
            
            "fnServerData": fnServerData,
            
            "oLanguage": {
                "sSearch": ""
            },
            
            "aLengthMenu": [[50, 100, 500, -1], [50, 100, 500, "All"]],
            "iDisplayLength": 50,
            
            "sPaginationType": "full_numbers",
            "bJQueryUI": true,
            "bAutoWidth": true,
           
            "sDom": 'lf<"dt-process-rel"r><"H"T><"dataTables_scrolling"t><"F"ip>', 
            
            "oTableTools": {
                "sSwfPath": "/js/datatables/plugin/TableTools/swf/copy_cvs_xls_pdf.swf",
                "aButtons": [
                             "copy",
                             {
                                 "sExtends": "csv",
                                 "fnClick": setFlashFileName
                             },
                             {
                                 "sExtends": "xls",
                                 "fnClick": setFlashFileName
                             },
                             {
                                 "sExtends": "pdf",
                                 "fnClick": setFlashFileName
                             },
                             "print"
                         ]
            }
        });
        oTable.fnSetFilteringDelay(350);
        
        historyContentDiv.find(".dataTables_scrolling").css("max-height", tableHeight);
        
        return oTable;
    }