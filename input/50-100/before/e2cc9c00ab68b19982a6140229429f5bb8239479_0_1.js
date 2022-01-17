function ()
                {
                    var animation_name;
                    
                    /// Don't save if there are no frames.
                    if (editor.cur_animation.frames < 1) {
                        return;
                    }
                    
                    /// Is it a new animation?
                    if (!editor.selected_animation) {
                        animation_name = window.prompt("Enter animation name:");
                        
                        if (animation_name === null || animation_name.trim() === "") {
                            return;
                        }
                        editor.selected_animation = animation_name;
                    } else if (!window.confirm("Are you sure you want to save over \"" + editor.selected_animation + "\"?\n\n(If not, select \"(new)\" in the animation drop down box.)")) {
                        return;
                    }
                    save_animation(editor.selected_animation, editor.cur_animation);
                }