function (row, index) {
            var model = fluid.get(that.options.list, fluid.model.composeSegments(that.options.offset + index, "summarylist")),
                fullModel = fluid.get(that.options, fluid.model.composeSegments("list", that.options.offset + index)),
                locked = cspace.util.resolveLocked(model);
            if (locked || !fullModel) {
                return;
            }
            var canRemoveRelation = cspace.util.resolveDeleteRelation({
                resolver: that.permissionsResolver,
                allOf: [{
                    target: that.options.primary,
                    permission: that.options.removeRelationPermission
                }, {
                    target: that.options.related,
                    permission: that.options.removeRelationPermission
                }],
                primaryModel: that.globalModel.model.primaryModel,
                relatedModel: fullModel
            });
            if (!canRemoveRelation) {
                return;
            }
            var name = "removerWidget-" + index;
            that.options.components[name] = {
                type: "cspace.util.removerWidget",
                container: cspace.util.relationRemover.getRemoverWidgetConatiner(that.options.rows, index),
                options: {
                    related: that.options.related,
                    csid: fullModel.csid
                }
            };
            fluid.initDependent(that, name, that.instantiator);
        }