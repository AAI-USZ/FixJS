function cancel_hide(){
                    clearTimeout(hide_timeout);
                    e.target.focus();
                    t.picker.off('click', cancel_hide);
                }