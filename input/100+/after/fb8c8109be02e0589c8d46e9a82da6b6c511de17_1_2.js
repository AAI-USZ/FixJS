function updatePalette(packages) {
        // build the new html
        var html = '<div class="ui-widget" style="clear:both">'
                 +   '<label for="objtt-select" id="objtt-search">Search: </label>'
                 +   '<input id="objtt-select">'
                 + '</div>';
        html += '<table id="objtypetable" style="width:100%"' +
                ' cellpadding="0" cellspacing="0" border="0" >';
        // headers: ClassName, Module Path, Version, Context, Interfaces
        html += '<thead><tr><th></th><th></th><th></th><th></th><th></th></tr></thead>';
        html += '<tbody>';
        jQuery.each(packages, function(name,item) {
            html+= packageHTML(name, item);
        });
        html += '</tbody></table>';

        // replace old html
        self.elm.html(html);

        var dtable = self.elm.find('#objtypetable').dataTable({
            'bPaginate': false,
            'bjQueryUI': true,
            'bScrollCollapse': true,
            'bFilter': true,    // make sure filtering is still turned on
            'aoColumnDefs': [
                 { 'bVisible': false, 'aTargets': [1,2,3,4] }
             ],
            'sDom': '<"H"lr>t<"F">'   // removes the built-in filter field and bottom info (default is lfrtip)
        });

        // here's the default list of filters for the library
        var selections = [
                    "In Project",
                    "Architecture",
                    "Assembly",
                    "CaseRecorder",
                    "CaseIterator",
                    "Component",
                    "Differentiator",
                    "DOEgenerator",
                    "Driver",
                    "Solver",
                    "Surrogate",
                    //"UncertainVariable",
                    "Variable"
                ];
        var input_obj = self.elm.find('#objtt-select');
        input_obj.autocomplete({
           source: function(term, response_cb) {
               response_cb(selections);
           },
           select: function(event, ui) {
               input_obj.value = ui.item.value;
               ent = jQuery.Event('keypress.enterkey');
               ent.target = input_obj;
               ent.which = 13;
               input_obj.trigger(ent);
           },
           delay: 0,
           minLength: 0
        });
        input_obj.bind('keypress.enterkey', function(e) {
            if (e.which === 13) {
                dtable.fnFilter( e.target.value );
                dtable.width('100%');
                if (selections.indexOf(e.target.value) === -1) {
                   selections.push(e.target.value);
                }
                input_obj.autocomplete('close');
            }
        });

        var contextMenu = jQuery("<ul id='lib-cmenu' class='context-menu'>")
                          .appendTo(dtable);

        var objtypes = dtable.find('.objtype');

        // given a click event, find the table entry that corresponds
        // to that location. Returns the matching element.
        function _findMatch(ev) {
            var otop = 0, match=0;
            var event_top = ev.target.offsetParent.offsetTop;
            objtypes.each(function(i, elem) {
               otop = getElementTop(elem);
               // elemoffsetHeight = 0 for invisible entries
               if (otop <= event_top && (otop+elem.offsetHeight)>=event_top) {
                  match = elem;
                  return false; // break out of loop
               }
            });
            return match;
        }

        contextMenu.append(jQuery('<li>View Docs</li>').click(function(ev) {
            var modpath = _findMatch(ev).getAttribute('modpath');
            var url = '/docs/plugins/'+modpath;
            var parts = modpath.split('.');
            var cname = parts.pop();
            window.open(url, 'Docs for '+modpath);
        }));
        contextMenu.append(jQuery('<li>View Metadata</li>').click(function(ev) {
            var match = _findMatch(ev),
                win   = jQuery('<div></div>'),
                table = jQuery('<table cellpadding=5px>')
                    .append('<tr><th></th><th></th></tr>'),
                hdata = ['name','modpath','version','context','ifaces'],
                data  = dtable.fnGetData(match.parentNode),
                i;
            for (i=1; i<data.length; i++) {
               table.append('<tr><td>'+hdata[i]+'</td><td>'+data[i]+'</td></tr>');
            }
            win.append(table);

            // Display dialog
            jQuery(win).dialog({
                title: match.innerText+' Metadata',
                width: 'auto'
            });
        }));
        ContextMenu.set(contextMenu.attr('id'), dtable.attr('id'));

        // make everything draggable
        objtypes.draggable({ helper: 'clone', appendTo: 'body' });
        objtypes.addClass('jstree-draggable'); // allow drop on jstree
    }