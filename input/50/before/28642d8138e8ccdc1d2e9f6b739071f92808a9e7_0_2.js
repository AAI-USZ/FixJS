function do_hide(){
                    t.hide.apply(t, args);
                    t.picker.off('click', cancel_hide);
                }