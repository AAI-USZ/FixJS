function(templates) {
                var templatesToRender = false;
                for (var i = 0; i < templates.length; i++) {
                    if (templates[i].id === tuid) {
                        templatesToRender = templates[i];
                        break;
                    }
                }
                if (templatesToRender) {
                    if (templatesToRender.templates.length === 1) {
                        renderCreateWorld(templatesToRender.id, templatesToRender.templates[0].id, true);
                    } else {
                        renderTemplateList(templatesToRender);
                    }
                }
            }