function(elem, threadObject) {
            if (threadObject == undefined) {
                elem.innerHTML = '';

                return;
            }

            elem.innerHTML = threadObject.num_comments;
        }