function ()
                {
                    var animation,
                        tile;
                    
                    animation = editor.animations[animation_select.value];
                    
                    if (animation_select.value !== "" && animation) {
                        cur_animation.frames = animation.frames;
                        cur_animation.asset = animation.asset;
                        cur_animation.delay = animation.delay;
                        delay_box.value = animation.delay;
                        
                        tile = editor.tiles[animation.asset][animation.frames[0]];
                        
                        demo_size = {w: tile.w, h: tile.h};
                        
                        editor.selected_animated_tilesheet = animation.asset;
                        selected_animation = animation_select.value;
                        
                        editor.change_selection_box(tilesheet_select, animation.asset);
                        window.localStorage.setItem("selected_animated_tilesheet", animation.asset);
                         
                        display_demo();
                        draw_tilesheet();
                    } else {
                        selected_animation = undefined;
                    }
                }