function(event) {  

///////////////////////////////////////////////////////////////////////////////
/// Home   
///////////////////////////////////////////////////////////////////////////////

    if (location.hash == '' || location.hash =='#') {
      drawCollectionsTable();
      $('#subCenterView').hide();
      $('#centerView').show();
      $('#collectionsView').show(); 
      createnav("Collections"); 
      highlightNav("#nav1");
    }

///////////////////////////////////////////////////////////////////////////////
/// new document table view (collection) 
///////////////////////////////////////////////////////////////////////////////

    else if (location.hash.substr(0, 12) == "#collection?" ) {
      $("#addNewDocButton").removeAttr("disabled");
      tableView = true; 
      $('#toggleNewDocButtonText').text('Edit Source'); 
      
      var collectionID = location.hash.substr(12, location.hash.length); 
      var collID = collectionID.split("=");
      
      $.ajax({
        type: "GET",
        url: "/_api/collection/" + collID[0],
        contentType: "application/json",
        processData: false, 
        success: function(data) {
          collectionName = data.name;
          $('#nav2').text(collectionName);
          $('#nav2').attr('href', '#showCollection?' +collID[0]);
          $('#nav1').attr('class', 'arrowbg');
        },
        error: function(data) {
        }
      });

      $('#nav1').text('Collections'); 
      $('#nav1').attr('href', '#');
      $('#nav2').attr('class', 'arrowbg');
      $('#nav3').text('new document'); 
      highlightNav("#nav3");

      newDocumentTable.fnClearTable(); 
      documentTableMakeEditable('#NewDocumentTableID');
      hideAllSubDivs();
      $('#collectionsView').hide();
      $('#newDocumentView').show();
      $('#NewDocumentTableView').show();
      $('#NewDocumentSourceView').hide();
    }

///////////////////////////////////////////////////////////////////////////////
///  showe edit documents view  
///////////////////////////////////////////////////////////////////////////////

    else if (location.hash.substr(0, 14) == "#editDocument?") {
      tableView = true; 
      $("#addEditedDocRowButton").removeAttr("disabled");
      $('#toggleEditedDocButton').val('Edit Source'); 
      $('#toggleEditedDocButtonText').text('Edit Source'); 
      
      $('#documentEditSourceView').hide();
      $('#documentEditTableView').show();
      var collectiondocID = location.hash.substr(14, location.hash.length); 
      collectionID = collectiondocID.split("/"); 

      $.ajax({
        type: "GET",
        url: "/_api/collection/" + collectionID,
        contentType: "application/json",
        processData: false, 
        success: function(data) {
          collectionName = data.name;
          $('#nav2').text(collectionName);
          $('#nav2').attr('href', '#showCollection?' +collectionID[0]);
        },
        error: function(data) {
        }
      });
 
      $('#nav1').text('Collections');
      $('#nav1').attr('href', '#');
      $('#nav1').attr('class', 'arrowbg');
      $('#nav2').attr('class', 'arrowbg');
      $('#nav3').text('Edit document:' + collectionID[1]); 

      $.ajax({
        type: "GET",
        url: "/_api/document/" + collectiondocID,
        contentType: "application/json",
        processData: false, 
        success: function(data) {
          $('#documentEditSourceBox').val(JSON.stringify(data));  
          documentEditTable.fnClearTable(); 
          hideAllSubDivs();
          $('#collectionsView').hide();
          $('#documentEditView').show();
          $('#documentEditSourceView').hide();
          $.each(data, function(key, val) {
            if (key == '_id') {
              documentEditTable.fnAddData(["", key, val, JSON.stringify(val)]);
            }
            else if (key == '_rev') {
              documentEditTable.fnAddData(["", key, value2html(val), JSON.stringify(val)]);
            }
            else if (key != '_rev' && key != '_id') {
              documentEditTable.fnAddData(['<button class="enabled" id="deleteEditedDocButton"><img src="/_admin/html/media/icons/delete_icon16.png" width="16" height="16"></button>',key, value2html(val), JSON.stringify(val)]);
            }
          });
          documentTableMakeEditable('#documentEditTableID');
          showCursor();
        },
        error: function(data) {
        }
      });
    }

///////////////////////////////////////////////////////////////////////////////
///  show colletions documents view 
///////////////////////////////////////////////////////////////////////////////

    else if (location.hash.substr(0, 16) == "#showCollection?") {
      $('#nav1').removeClass('highlighted'); 
      var collectionID = location.hash.substr(16, location.hash.length); 
      globalAjaxCursorChange();
      $.ajax({
        type: "GET",
        url: "/_api/collection/" + collectionID + "/count", 
        contentType: "application/json",
        processData: false,
        async: false,  
        success: function(data) {
          globalCollectionName = data.name;
          test = data.name; 
          collectionCount = data.count; 
          $('#nav2').text(globalCollectionName);
        },
        error: function(data) {
        }
      });

      $('#nav1').text('Collections');
      $('#nav1').attr('href', '#');
      $('#nav2').attr('href', null);
      $('#nav3').text(''); 
      highlightNav("#nav2");
      $("#nav3").removeClass("arrowbg");
      $("#nav2").removeClass("arrowbg");
      $("#nav1").addClass("arrowbg");

      $.ajax({
        type: 'PUT',
        url: '/_api/simple/all/',
        data: '{"collection":"' + globalCollectionName + '","skip":0,"limit":10}', 
        contentType: "application/json",
        success: function(data) {
          $.each(data.result, function(k, v) {
            documentsTable.fnAddData(['<button class="enabled" id="deleteDoc"><img src="/_admin/html/media/icons/doc_delete_icon16.png" width="16" height="16"></button><button class="enabled" id="editDoc"><img src="/_admin/html/media/icons/doc_edit_icon16.png" width="16" height="16"></button>', v._id, v._rev, '<pre class="prettify">' + cutByResolution(JSON.stringify(v)) + "</pre>"]);  
          });
        $(".prettify").snippet("javascript", {style: "nedit", menu: false, startText: false, transparent: true, showNum: false});
        showCursor();
        },
        error: function(data) {
          
        }
      });
      documentsTable.fnClearTable(); 
      hideAllSubDivs();
      $('#collectionsView').hide();
      $('#documentsView').show();
      totalCollectionCount = Math.ceil(collectionCount / 10); 
      collectionCurrentPage = 1;
      $('#documents_status').text("Showing page 1 of " + totalCollectionCount); 
    }

///////////////////////////////////////////////////////////////////////////////
///  shows edit collection view  
///////////////////////////////////////////////////////////////////////////////

    else if (location.hash.substr(0, 16)  == "#editCollection?") {
      var collectionID = location.hash.substr(16, location.hash.length); 
      var collectionName;
      var tmpStatus; 
 
      $.ajax({
        type: "GET",
        url: "/_api/collection/" + collectionID,
        contentType: "application/json",
        processData: false, 
        success: function(data) {
          collectionName = data.name;
          $('#nav2').text('Edit: ' + collectionName);
          $('#editCollectionName').val(data.name); 
          $('#editCollectionID').text(data.id);

          switch (data.status) {
          case 1: tmpStatus = "new born collection"; break; 
          case 2: tmpStatus = "unloaded"; break; 
          case 3: tmpStatus = "loaded"; break; 
          case 4: tmpStatus = "in the process of being unloaded"; break; 
          case 5: tmpStatus = "deleted"; break; 
          }

          $('#editCollectionStatus').text(tmpStatus); 
          checkCollectionName = collectionName; 
        },
        error: function(data) {
        }
      });

      $('#nav1').text('Collections');
      $('#nav1').attr('href', '#');
      $('#nav1').attr('class', 'arrowbg');
      hideAllSubDivs();
      $('#collectionsView').hide();
      $('#editCollectionView').show();
      $('#editCollectionName').focus();
    }

///////////////////////////////////////////////////////////////////////////////
///  shows log view 
///////////////////////////////////////////////////////////////////////////////

    else if (location.hash == "#logs") {
      createLogTable(5); 
      hideAllSubDivs(); 
      $('#collectionsView').hide();
      $('#logView').show();
      createnav ("Logs"); 
      showCursor();
    }

///////////////////////////////////////////////////////////////////////////////
///  shows status view 
///////////////////////////////////////////////////////////////////////////////

    else if (location.hash == "#status") {
      hideAllSubDivs(); 
      $('#collectionsView').hide();
      $('#statusView').show();
      createnav ("Status"); 
    }

///////////////////////////////////////////////////////////////////////////////
///  shows config view 
///////////////////////////////////////////////////////////////////////////////

    else if (location.hash == "#config") {
      hideAllSubDivs();
      $('#configContent').empty();  
      $('#collectionsView').hide();
      $('#configView').show();
      createnav ("Configuration"); 
      var switcher = "primary";
      var insertType;  

      $.ajax({
        type: "GET", url: "/_admin/config/description",contentType: "application/json", processData: false, async: false,   
        success: function(data) {
          $.each(data, function(key, val) {
            if (key == "error" || key == "code") {
            }
            else {
              $('#configContent').append('<div class="customToolbar">' + val.name + '</div>');
              $.each(val, function(k, v) {
                if (v.name != undefined) {
                  switch(v.type) { 
                    case 'integer':
                      if (v.readonly == true) {
                        insertType = '<a class="conf_integer" id="conf_' + k + '">123456</a>'; break;
                      }
                      else { 
                        insertType = '<a class="conf_integer editInt" id="conf_' + k + '">123456</a>'; break;
                      }
                    case 'string':
                      if (v.readonly == true) {  
                        insertType = '<a class="conf_string" id="conf_' + k + '">string</a>'; break;
                      }
                      else {
                        insertType = '<a class="editString conf_string" id="conf_' + k + '">string</a>'; break;
                      }
                    case 'pull-down':
                      insertType = '<select class="conf_pulldown" id="conf_' + k + '" name="someselect" size="1">';
                      $.each(v.values, function(KEY, VAL) {
                        insertType += '<option>' + VAL + '</option>';
                      }); 
                      insertType += '</select>';
                      break; 
                    case 'boolean': 
                      insertType = '<select class="conf_boolean" id="conf_' + k + '" name="someselect" size="1">';
                      insertType += '<option>true</option><option>false</option>'; break;
                    //TODO Section 
                    case 'section':
                      insertType = '<a class="conf_section" id="conf_' + k + '">someval</a>'; break;
                  } 
                  $('#configContent').append('<tr><td>' + v.name + '</td><td>' + insertType + '</td></tr>');
                  makeStringEditable(); 
                  makeIntEditable(); 
                }
              });
            }
          });
          $.ajax({
            type: "GET", url: "/_admin/config/configuration",contentType: "application/json", processData:false, async:false, 
            success: function(data) {
              var currentID;
              var currentClass;  
              $.each(data, function(key, val) {
                if (key == "error" || key == "code") {
                }
                else {
                  $.each(val, function(k, v) {
                    currentID = "#conf_" + k; 
                    currentClass = $(currentID).attr('class');

                    if ($(currentID).hasClass('conf_string')) {
                      $(currentID).text(v.value);  
                    }
                    else if ($(currentID).hasClass('conf_integer')) {
                      $(currentID).text(v.value);  
                    }
                    else if ($(currentID).hasClass('conf_boolean')) {
                      $(currentID).val(v.value);  
                    }
                    else if ($(currentID).hasClass('conf_pulldown')) {
                      $(currentID).val(v.value);  
                    }
                    //TODO Section 
                    else if ($(currentID).hasClass('conf_section')) {
                      $(currentID).text(v.file.value);  
                    }


                  }); 
                }
              });
            },
            error: function(data) {
            }
          });
        },
        error: function(data) {
        }
      });
/* 
      var content={"Menue":{"Haha":"wert1", "ahha":"wert2"}, "Favoriten":{"top10":"content"},"Test":{"testing":"hallo 123 test"}}; 
      $("#configContent").empty();

      $.each(content, function(data) {
        $('#configContent').append('<div class="customToolbar">' + data + '</div>');
        $.each(content[data], function(key, val) {
          if (switcher == "primary") {
            $('#configContent').append('<a class="toolbar_left toolbar_primary">' + key + '</a><a class="toolbar_right toolbar_primary">' + val + '</a><br>');
          switcher = "secondary"; 
          }
          else if (switcher == "secondary") {
            $('#configContent').append('<a class="toolbar_left toolbar_secondary">' + key + '</a><a class="toolbar_right toolbar_secondary">' + val + '</a><br>');
          switcher = "primary"; 
          }
        });         
      }); 
*/
    }

///////////////////////////////////////////////////////////////////////////////
///  shows query view  
///////////////////////////////////////////////////////////////////////////////

    else if (location.hash == "#query") {
      hideAllSubDivs(); 
      $('#queryContent').val('');
      $('#collectionsView').hide();
      $('#queryView').show();
      createnav ("Query"); 
      $('#queryContent').focus();
    }

///////////////////////////////////////////////////////////////////////////////
///  shows avocsh view 
///////////////////////////////////////////////////////////////////////////////

    else if (location.hash == "#avocsh") {
      hideAllSubDivs(); 
      $('#avocshContent').val('');
      $('#collectionsView').hide();
      $('#avocshView').show();
      createnav ("ArangoDB Shell"); 
      $('#avocshContent').focus();
      if (printedHelp === false) {
        print(welcomeMSG + require("arangosh").HELP);
        printedHelp = true; 
        start_pretty_print(); 
      }
      $("#avocshContent").autocomplete({
        source: shArray
      });
    }

///////////////////////////////////////////////////////////////////////////////
///  shows create new collection view 
///////////////////////////////////////////////////////////////////////////////

    else if (location.hash == "#createCollection") {
      $('#nav1').attr('href', '#'); 
      $('#nav1').text('Collections');
      $('#nav2').text('Create new collection');
      $('#nav1').attr('class', 'arrowbg'); 

      hideAllSubDivs();
      $('#collectionsView').hide();
      $('#createCollectionView').show();
      $('#createCollName').focus();
      $('#createCollName').val('');
      $('#createCollSize').val('');
    }
  }