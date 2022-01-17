function(node) {
                    var classname = '';
                    if (node.type == 'folder') { classname = classname + ' fp-folder';}
                    if (node.filepath) { classname = classname + ' fp-hascontextmenu';}
                    if (node.sortorder == 1) { classname = classname + ' fp-mainfile';}
                    return Y.Lang.trim(classname);
                }