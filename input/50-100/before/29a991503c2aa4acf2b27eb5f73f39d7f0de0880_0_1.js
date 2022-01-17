function (dv) {
                var agentId = dv.model.get("id");
                var matchingAgents = self.collection.where({ id: agentId });
                if (matchingAgents.length == 1) {
                    dv.model = matchingAgents[0];
                }
                dv.render($('ul', self.el));
                dv.delegateEvents();
            }