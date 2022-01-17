function(node) {
            var selectnode = this.filemanager.one('.fp-select');
            selectnode.removeClass('loading').removeClass('fp-folder').
                removeClass('fp-file').removeClass('fp-zip').removeClass('fp-cansetmain');
            if (node.type == 'folder' || node.type == 'zip') {selectnode.addClass('fp-'+node.type);}
            else {selectnode.addClass('fp-file');}
            if (this.enablemainfile && (node.sortorder != 1) && node.type == 'file') {
                selectnode.addClass('fp-cansetmain');
            }
            this.selectui.fileinfo = node;
            selectnode.one('.fp-saveas input').set('value', node.fullname);
            var foldername = this.get_parent_folder_name(node);
            selectnode.all('.fp-origpath .fp-value').setContent(foldername);
            selectnode.all('.fp-author input').set('value', node.author);
            selectnode.all('.fp-license select option[selected]').set('selected', false);
            selectnode.all('.fp-license select option[value='+node.license+']').set('selected', true);
            selectnode.all('.fp-path select option[selected]').set('selected', false);
            selectnode.all('.fp-path select option').each(function(el){
                if (el.get('value') == foldername) {el.set('selected', true);}
            });
            selectnode.all('.fp-author input, .fp-license select').set('disabled',(node.type == 'folder')?'disabled':'');
            // display static information about a file (when known)
            var attrs = ['datemodified','datecreated','size','dimensions'];
            for (var i in attrs) {
                if (selectnode.one('.fp-'+attrs[i])) {
                    var value = (node[attrs[i]+'_f']) ? node[attrs[i]+'_f'] : (node[attrs[i]] ? node[attrs[i]] : '');
                    selectnode.one('.fp-'+attrs[i]).addClassIf('fp-unknown', ''+value == '')
                        .one('.fp-value').setContent(value);
                }
            }
            // display thumbnail
            var imgnode = Y.Node.create('<img/>').
                set('src', node.realthumbnail ? node.realthumbnail : node.thumbnail).
                setStyle('maxHeight', ''+(node.thumbnail_height ? node.thumbnail_height : 90)+'px').
                setStyle('maxWidth', ''+(node.thumbnail_width ? node.thumbnail_width : 90)+'px');
            selectnode.one('.fp-thumbnail').setContent('').appendChild(imgnode);
            // show panel
            this.selectui.show();
        }