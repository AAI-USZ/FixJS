function() { var parent = jQuery(this);

      var set = jQuery.extend({

        urlGet:       "sheets/enduser.documentation.html", //local url, if you want to get a sheet from a url

        urlSave:      "save.html",          //local url, for use only with the default save for sheet

        editable:       true,               //bool, Makes the jSheetControls_formula & jSheetControls_fx appear

        editableTabs:   true,             //bool, If sheet is editable, this allows users to change the tabs by second click

        barMenus:     true,             //bool, if sheet is editable, this will show the mini menu in barTop and barLeft for sheet manipulation

        socket: null, //object, websocket connection

        freezableCells:   false,              //bool, if sheet is editable, this will show the barHandles and allow user to drag them to freeze cells, not yet working.

        allowToggleState:   true,             //allows the function that changes the spreadsheet's state from static to editable and back

        urlMenu:      "/menu.html",           //local url, for the menu to the left of title

        menu:     '',             //menu AS STRING!, overrides urlMenu

        newColumnWidth:   120,              //int, the width of new columns or columns that have no width assigned

        title:        null,               //html, general title of the sheet group

        inlineMenu:     null,               //html, menu for editing sheet

        buildSheet:     false,              //bool, string, or object

                                    //bool true - build sheet inside of parent

                                    //bool false - use urlGet from local url

                                    //string  - '{number_of_cols}x{number_of_rows} (5x100)

                                    //object - table

        calcOff:      false,              //bool, turns calculationEngine off (no spreadsheet, just grid)

        log:        false,              //bool, turns some debugging logs on (jS.log('msg'))

        lockFormulas:     false,              //bool, turns the ability to edit any formula off

        parent:       parent,           //object, sheet's parent, DON'T CHANGE

        colMargin:      18,               //int, the height and the width of all bar items, and new rows

        fnSave:       function() { parent.getSheet().saveSheet(); }, //fn, default save function, more of a proof of concept

        fnOpen:       function() {          //fn, by default allows you to paste table html into a javascript prompt for you to see what it looks likes if you where to use sheet

                    var t = prompt('Paste your table html here');

                    if (t) {

                      parent.getSheet().openSheet(t);

                    }

        },

        fnClose:      function() {},          //fn, default clase function, more of a proof of concept

        

        boxModelCorrection: 2,                //int, attempts to correct the differences found in heights and widths of different browsers, if you mess with this, get ready for the must upsetting and delacate js ever

        calculations:   {},               //object, used to extend the standard functions that come with sheet

        cellSelectModel:  'excel',            //string, 'excel' || 'oo' || 'gdocs' Excel sets the first cell onmousedown active, openoffice sets the last, now you can choose how you want it to be ;)

        autoAddCells:   true,             //bool, when user presses enter on the last row/col, this will allow them to add more cells, thus improving performance and optimizing modification speed

        resizable:      true,             //bool, makes the $(obj).sheet(); object resizeable, also adds a resizable formula textarea at top of sheet

        autoFiller:     false,              //bool, the little guy that hangs out to the bottom right of a selected cell, users can click and drag the value to other cells

        minSize:      {rows: 15, cols: 5},      //object - {rows: int, cols: int}, Makes the sheet stay at a certain size when loaded in edit mode, to make modification more productive

        forceColWidthsOnStartup:true,           //bool, makes cell widths load from pre-made colgroup/col objects, use this if you plan on making the col items, makes widths more stable on startup

        alertFormulaErrors: false

      }, settings);

      

      if (jQuery.sheet.instance) {

        parent.sheetInstance = jQuery.sheet.createInstance(set, jQuery.sheet.instance.length, parent);

        jQuery.sheet.instance.push(parent.sheetInstance);

      } else {

        parent.sheetInstance = jQuery.sheet.createInstance(set, 0, parent);

        jQuery.sheet.instance = [parent.sheetInstance];

      }

      parent.attr('sheetInstance', jQuery.sheet.instance.length - 1);

    }