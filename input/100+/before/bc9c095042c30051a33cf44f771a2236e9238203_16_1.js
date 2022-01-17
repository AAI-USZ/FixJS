function(){
            var templatesToRender = false;
            for (var i = 0; i < sakai.config.worldTemplates.length; i++){
                if (sakai.config.worldTemplates[i].id === tuid){
                    templatesToRender = sakai.config.worldTemplates[i];
                    break;
                }
            }
            if (templatesToRender){
                if (templatesToRender.templates.length === 1){
                    renderCreateWorld(templatesToRender.id, templatesToRender.templates[0].id, true);
                } else {
                    renderTemplateList(templatesToRender);
                }
            }
        }