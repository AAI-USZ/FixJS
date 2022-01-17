function(structure, manager, editor) {
            for (var i in structure) {
                if (structure.hasOwnProperty(i)) {
                    structure[i]._canEdit = manager || editor;
                    structure[i]._canSubedit = manager || editor;
                }
            }
            return structure;
        }