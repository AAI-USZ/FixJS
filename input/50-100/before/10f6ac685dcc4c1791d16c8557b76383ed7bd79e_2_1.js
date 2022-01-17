function(structure, value){
            for (var i in structure){
                if (structure.hasOwnProperty(i)){
                    structure[i]._canEdit = value;
                    structure[i]._canSubedit = value;
                }
            }
            return structure;
        }