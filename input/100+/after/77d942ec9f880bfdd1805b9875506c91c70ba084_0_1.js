function () {
            var self = this;
            this._rendered = true;

            var addHostnameValue = $('input[name=hostname]', this.$el).val();
            
            $(this.el).html(_appTemplate);
            $("button#updateSelected", this.el).click(self.updateSelected);
            $('input[name=hostname]', this.$el).val(addHostnameValue);

            var queryableViews = new jsinq.Enumerable(self.agentViews);
            this.collection.each(function(agent) {
                var viewExists = queryableViews
                    .where(function(view) { return view.id == agent.id; })
                    .select(function(view) { return view; })
                    .any();
                if (!viewExists) {
                    self.add(agent);
                    console.log('adding view for agent ' + agent.id);
                }
            });

            _(this.agentViews).each(function (dv) {
                var agentId = dv.model.get("id");
                var matchingAgents = self.collection.where({ id: agentId });
                if (matchingAgents.length == 1) {
                    dv.model = matchingAgents[0];
                }
                dv.render($('ul#agents', self.el));
                dv.delegateEvents();
            });
        }