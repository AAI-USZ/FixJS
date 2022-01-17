function push(page) {
                var state = {page: page}
                if (replace_state) {
                    console.log("Replacing state");
                    window.history.replaceState(state);
                    replace_state = false;
                } else {
                    window.history.pushState(state);
                }
            }