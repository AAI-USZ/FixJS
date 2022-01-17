function ()
                {
                    var animation_name;
                    
                    if (!selected_animation) {
                        animation_name = prompt("Enter animation name:");
                        
                        if (animation_name === null || animation_name.trim() === "") {
                            return;
                        }
                        selected_animation = animation_name;
                    } else if (!confirm("Are you sure you want to save over \"" + selected_animation + "\"?\n\n(If not, select \"(new)\" in the animation drop down box.)")) {
                        return;
                    }
                    save_animation(selected_animation, cur_animation);
                }