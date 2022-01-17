function() {
                              infowindow.open(map,smarker);
                              
                                // Reload the table with local users
                                if ( oTable == null )
                                {
                                    oTable = $('#example').dataTable( {
                                        "bProcessing": false,
                                        "bAutoWidth":true,
                                        "bFilter":false,
                                        "bInfo":false,
                                        "bLengthChange":false,
                                        "sAjaxSource": "/markerUsers?dh_id=" + item.dh_id,
                                        "aoColumns": [
                                            { "mDataProp": "reputation" },
                                            { "mDataProp": "name" },
                                            { "mDataProp": "location" }
                                        ]
                                    } );
                                }
                                else
                                {
                                    refreshTable( oTable, "/markerUsers?dh_id=" + item.dh_id );
                                }
                                
                                markersArray.push(smarker);
                            }