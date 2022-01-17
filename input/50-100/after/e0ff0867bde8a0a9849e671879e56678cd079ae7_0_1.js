function(node) {
                    var classname = '';
                    if (node.type == 'folder' || (!node.type && !node.filename)) {
                        classname = classname + ' fp-folder';
                    }
                    if (node.filename || node.filepath || (node.path && node.path != '/')) {
                        classname = classname + ' fp-hascontextmenu';
                    }
                    if (node.sortorder == 1) { classname = classname + ' fp-mainfile';}
                    return Y.Lang.trim(classname);
                }