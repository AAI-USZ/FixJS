function() {
                var worlds = [];
                var obj = {};
                for (var c = 0; c < sakai.config.worldTemplates.length; c++){
                    var world = sakai.config.worldTemplates[c];
                    world.label = sakai.api.i18n.getValueForKey(world.titlePlural);
                    if(c===sakai.config.worldTemplates.length-1){
                        world.last = true;
                    }
                    worlds.push(world);
                }
                obj.worlds = worlds;
                $errorsecondcolcontainer.append(sakai.api.Util.TemplateRenderer($secondcoltemplate, obj));
            }