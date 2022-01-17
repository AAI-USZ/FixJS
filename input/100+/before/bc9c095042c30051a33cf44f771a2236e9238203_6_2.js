function(cat, id){
            var category = false;
            for (var i = 0; i < sakai_conf.worldTemplates.length; i++){
                if (sakai_conf.worldTemplates[i].id === cat){
                    category = sakai_conf.worldTemplates[i];
                    break;
                }
            }
            var template = false;
            if (category && category.templates && category.templates.length) {
                for (var w = 0; w < category.templates.length; w++){
                    if (category.templates[w].id === id){
                        template = category.templates[w];
                        break;
                    }
                }
            }
            return template;
        }