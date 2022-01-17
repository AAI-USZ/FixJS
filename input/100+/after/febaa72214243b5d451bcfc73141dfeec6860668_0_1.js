function($trigger, e) {
            $target = $(e.currentTarget).find('div');
            var axis = $(e.currentTarget).hasClass('rows') ? "ROWS" : "COLUMNS"
            var pos = $target.attr('rel').split(':');
            var row = parseInt(pos[0])
            var col = parseInt(pos[1])
            var cell = self.workspace.query.result.lastresult().cellset[row][col];
            var query = self.workspace.query;
            var schema = query.get('schema');
            var cube = query.get('connection') + "/" + 
                query.get('catalog') + "/"
                + ((schema == "" || schema == null) ? "null" : schema) 
                + "/" + query.get('cube');

            var d = cell.properties.dimension;
            var h = cell.properties.hierarchy;
            var l = cell.properties.level;

            var keep_payload = JSON.stringify(
                {
                    "hierarchy"     : "[" + h + "]",
                    "uniquename"    : l,
                    "type"          : "level",
                    "action"        : "delete"
                }) 
            + "," +JSON.stringify(
                {
                    "hierarchy"     : "[" + h + "]",
                    "uniquename"    : cell.properties.uniquename,
                    "type"          : "member",
                    "action"        : "add"
                }       
            );

            var levels = [];
            var items = {};
            var dimensions = Saiku.session.sessionworkspace.dimensions[cube].get('data');
            var dimsel = {};
            var used_levels = [];

            self.workspace.query.action.get("/axis/" + axis + "/dimension/" + d, { 
                        success: function(response, model) {
                            dimsel = model;
                        },
                        async: false
            });

            _.each(dimsel.selections, function(selection) {
                if(_.indexOf(used_levels, selection.levelUniqueName) == -1)
                    used_levels.push(selection.levelUniqueName);

            });

            _.each(dimensions, function(dimension) {
                if (dimension.name == d) {
                    _.each(dimension.hierarchies, function(hierarchy) {
                        if (hierarchy.name == h) {
                            _.each(hierarchy.levels, function(level) {
                                items[level.name] = {
                                    name: level.name,
                                    payload: JSON.stringify({
                                        "hierarchy"     : "[" + h + "]",
                                        uniquename    : level.uniqueName,
                                        type          : "level",
                                        action        : "add"
                                    })
                                };
                                if(_.indexOf(used_levels, level.uniqueName) > -1) {
                                    items[level.name].disabled = true;
                                    items["remove-" + level.name] = {
                                        name: level.name,
                                        payload: JSON.stringify({
                                            "hierarchy"     : "[" + h + "]",
                                            uniquename    : level.uniqueName,
                                            type          : "level",
                                            action        : "delete"
                                        })
                                    };
                                    
                                }
                                items["keep-" + level.name] = items[level.name];
                                items["include-" + level.name] = JSON.parse(JSON.stringify(items[level.name]));
                                items["keep-" + level.name].payload = keep_payload + "," + items[level.name].payload;
                            });
                        }
                    });
                }
            });
            items["keeponly"] = { payload: keep_payload }
            

            
            var lvlitems = function(prefix) {
                var ritems = {};
                for (key in items) {
                    if (prefix != null && prefix.length < key.length && key.substr(0, prefix.length) == prefix) {
                            ritems[key] = items[key];
                    }
                }
                return ritems;
            }

            var member = $target.html();

            var citems = {
                    "name" : {name: "<b>" + member + "</b>", disabled: true },
                    "sep1": "---------",
                    "keeponly": {name: "Keep Only", payload: keep_payload }
            };
            if (d != "Measures") {
                citems["fold1key"] = {
                        name: "Include Level",
                        items: lvlitems("include-")
                    };
                citems["fold2key"] = {
                        name: "Keep and Include Level",
                        items: lvlitems("keep-")
                    };
                citems["fold3key"] = {
                        name: "Remove Level",
                        items: lvlitems("remove-")
                    };
            }
            return {
                callback: function(key, options) {
                    self.workspace.query.action.put('/axis/' + axis + '/dimension/' + d, { 
                        success: function() {
                            self.workspace.query.clear();
                            self.workspace.query.fetch({ success: function() {
                                
                                $(self.workspace.el).find('.fields_list_body ul').empty();
                                $(self.workspace.dimension_list.el).find('.parent_dimension a.folder_collapsed').removeAttr('style');
                                
                                $(self.workspace.dimension_list.el).find('.parent_dimension ul li')
                                    .draggable('enable')
                                    .css({ fontWeight: 'normal' });

                                $(self.workspace.measure_list.el).find('a.measure').parent()
                                    .draggable('enable')
                                    .css({ fontWeight: 'normal' });

                                self.workspace.populate_selections(self.workspace.measure_list.el);
                                $(self.workspace.el).find('.fields_list_body ul li')
                                    .removeClass('ui-draggable-disabled ui-state-disabled')
                                    .css({ fontWeight: 'normal' });

                             }});

                        },
                        data: {
                            selections: "[" + items[key].payload + "]"
                        }
                    });
                    
                },
                items: citems
            } 
        }