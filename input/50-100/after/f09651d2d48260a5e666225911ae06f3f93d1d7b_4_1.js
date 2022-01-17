function(content) {
        return pd.extend(Object.create({}), routil, session, content, {
            // sends a template
            sendTemplate: function(req, res, name, params) {
                // preventing templar to throw an error if there's no data
                if (!params) params = {};

                this.template(req, res, name + '.html', params);
            }
        });
    }