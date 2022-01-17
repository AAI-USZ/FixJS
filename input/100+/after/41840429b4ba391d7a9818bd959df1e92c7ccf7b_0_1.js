function (e) {
            e.preventDefault();
            this.indicator.show();
            var model = this.get('model');
            debugger;

            // we need to make sure the tag control is up to date so that we
            // don't miss any tags. If the user starts typing a tag, and then
            // stops and clicks save, the tag control will not have added the
            // phrase entered as a tag and it gets lost.
            Y.fire('tag:update', {
                type: 'blur',
                target: ''
            });

            // we need to set the content to be part of the model for this
            // request so we can pass it along, even though the content
            // isn't really valid for it.
            model.addAttr('content', {});

            // we have to do these changes in one fell swoop to prevent a mass
            // firing of the "init_model" callback on the model:change event
            model.setAttrs({
                url: Y.one('#url').get('value'),
                inserted_by: Y.one('#inserted_by').get('value'),
                description: Y.one('#description').get('value'),
                tags: Y.Array.map(this.tag_control.get('tags'), function (t) {
                    return t.get('text');
                }),
                extended: Y.one('#extended').get('value'),
                content: Y.one('textarea#content').get('value')
            });

            // should just be able to fire the save method on the model and
            // display to the user we're working on it.
            model.save(function (data, request) {
                // make sure that we store that this is a saved bookmark in
                // the localStorage index
                if (data.bmark.hash_id) {
                    localStorage.setItem(data.bmark.hash_id, 'true');
                }

                // update the badge now that we've saved
                var b = new Y.bookie.chrome.Badge();
                b.success();
                window.close();
            });
        }