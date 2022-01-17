function (event) {
                    var index = that.locate("resultsRow").index($(event.currentTarget));
                    var record = that.model.results[newModel.pageSize * newModel.pageIndex + index];
                    if (!record) {
                        return;
                    }
                    var vocab = cspace.vocab.resolve({
                        model: record,
                        recordType: record.recordType,
                        vocab: that.vocab
                    });
                    if (!vocab && that.vocab.isVocab(record.recordtype)) {
                        vocab = record.recordtype;
                    }
                    if (!vocab && that.vocab.hasVocabs(record.recordtype)) {
                        vocab = record.recordtype;
                    }
                    if (vocab === "all") {
                        vocab = record.recordtype;
                    }
                    var expander = cspace.urlExpander({
                        vars: {
                            recordType: record.recordtype,
                            csid: record.csid,
                            vocab: vocab ? fluid.stringTemplate(that.options.urls.vocab, {vocab: vocab}) : ""
                        }
                    });
                    if (that.searchReferenceStorage) {
                        that.searchReferenceStorage.set({
                            token: that.model.pagination.traverser,
                            index: index + newModel.pageSize * newModel.pageIndex,
                            source: that.options.source
                        });
                    }
                    window.location = expander(that.options.urls.pivot);
                    return false;
                }