function() {
                var worlds = [];
                var obj = {};
                for (var c = 0; c < templates.length; c++) {
                    var world = templates[c];
                    world.label = sakai.api.i18n.getValueForKey(world.titlePlural);
                    if (c === templates.length-1) {
                        world.last = true;
                    }
                    worlds.push(world);
                }
                obj.worlds = worlds;
                $errorsecondcolcontainer.append(sakai.api.Util.TemplateRenderer($secondcoltemplate, obj));
            }