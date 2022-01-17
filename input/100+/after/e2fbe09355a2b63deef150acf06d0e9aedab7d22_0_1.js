function (e)
                {
                    var className,
                        target = e.srcElement || e.originalTarget,
                        tile;
                    
                    if (editor.tool === "select") {
                        /// For some reason, Firefox occationally throws this error: "Error: Permission denied to access property 'className'",
                        /// so put it in a try/catch.
                        try {
                            className = target.className;
                        } catch (err) {}
                        
                        if (className === "map") {
                            tile = find_tile({x: e.clientX, y: e.clientY});
                            
                            if (tile) {
                                editor.array_remove(tile.sector, tile.num);
                                /// Erase the tile from the map.
                                editor.cur_map.canvases[tile.tile.l].cx.clearRect(tile.tile.x, tile.tile.y, tile.base_tile.w, tile.base_tile.h);
                                if (typeof tile.tile.a === "undefined") {
                                    editor.cur_animation.asset = editor.animations[tile.tile.t].asset;
                                    editor.cur_animation.frames = editor.animations[tile.tile.t].frames.slice();
                                    editor.cur_animation.delay = editor.animations[tile.tile.t].delay;
                                    editor.selected_animation = tile.tile.t;
                                    editor.set_animation_selection_box(editor.selected_animation)
                                    editor.change_tool("draw_animation");
                                } else {
                                    editor.selected_tilesheet = editor.cur_map.assets[tile.tile.a];
                                    editor.selected_tile = {
                                        tile:      tile.base_tile,
                                        tile_num:  tile.tile.t,
                                        tilesheet: editor.selected_tilesheet
                                    };
                                    ///TODO: Change the drop down selection too.
                                    editor.load_tilesheet(editor.selected_tilesheet);
                                    editor.change_tool("draw");
                                    editor.change_selection_box(editor.draw_tilesheet_el, editor.selected_tilesheet);
                                    window.localStorage.setItem("selected_tilesheet", editor.selected_tilesheet);
                                }
                                editor.event.trigger("change_drawing_level", {level: tile.tile.l});
                                editor.event.trigger("map_edit");
                            }
                        }
                    }
                }