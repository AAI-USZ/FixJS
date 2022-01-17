function (that) {
        that.listTag = fluid.typeTag(fluid.model.composeSegments("cspace", "relatedTabList", that.options.related));
        that.relationsUpdatedHandler = function (related) {
            if (related !== that.options.related) {
                return;
            }
            that.relatedRecordsListView.updateModel();
        };
        that.onDeleteRelation = function (target) {
            if (!target.csid || !target.recordtype) {
                target = undefined;
            }
            that.confirmation.open("cspace.confirmation.deleteDialog", undefined, {
                listeners: {
                    onClose: function (userAction) {
                        if (userAction === "act") {
                            that.events.deleteRelation.fire();
                            that.deleteRelationDataSource.remove({
                                source: {
                                    csid: that.options.csid,
                                    recordtype: that.options.primary
                                },
                                target: target || {
                                    csid: that.selectedRecordCsid,
                                    recordtype: that.options.related
                                },
                                type: "affects",
                                "one-way": false
                            }, null, function (data) {
                                if (data && data.isError) {
                                    data.messages = data.messages || fluid.makeArray("");
                                    fluid.each(data.messages, function (message) {
                                        that.messageBar.show(that.options.parentBundle.resolve("recordEditor-removeRelationsFailedMessage", [message]), null, true);
                                    });
                                    return;
                                }
                                that.events.afterDeleteRelation.fire(that.options.related, fluid.get(target, "csid") || that.selectedRecordCsid);
                            });
                        }
                    }
                },
                model: {
                    messages: [ "tab-re-deletePrimaryMessage" ]
                },
                parentBundle: that.options.parentBundle
            });
        };
        that.afterRelatedRecordCreate = function (model) {
            that.events.onAddRelation.fire({
                items: [{
                    source: {
                        csid: that.options.csid,
                        recordtype: that.options.primary
                    },
                    target: {
                        csid: model.csid,
                        recordtype: that.options.related
                    },
                    type: "affects",
                    "one-way": false
                }]
            });
        };
        that.onCreateNewRecord = function () {
            that.events.onSelect.fire({
                recordType: that.options.related
            });
        };
        that.afterDeleteRelation = function (related, csid) {
            var resolve = that.options.parentBundle.resolve,
                recordEditor = "relatedRecordsRecordEditor",
                recordEditorComponent = that[recordEditor],
                record = "record",
                instantiator = that.instantiator;
            if (recordEditorComponent && recordEditorComponent.model.csid === csid) {
                instantiator.clearComponent(that, recordEditor);
                that.instantiator.clearComponent(that, record);
                fluid.initDependent(that, record, instantiator);
            }
            that.messageBar.show(that.options.parentBundle.resolve("relationManager-afterDeleteRelation"), null, false);
        };
        that.onSelectHandler = function (record) {
            that.selectedRecordCsid = record.csid;
        };
        fluid.each(that.options.messagekeys, function (message, key) {
            var expanded = fluid.stringTemplate(message, {
                recordType: that.options.related
            });
            that.options.strings[key] = that.options.parentBundle.resolve(expanded);
        });
    }