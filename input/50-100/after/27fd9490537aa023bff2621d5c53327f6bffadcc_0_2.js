function(){
            var i,
                names = [],
                node = storage.get(id);

            while(node !== null && node !== undefined){
                for(i in node.attributes){
                    commonUtil.insertIntoArray(names,i);
                }
                node = storage.get(node.relations.baseId);
            }
            return names;
        }