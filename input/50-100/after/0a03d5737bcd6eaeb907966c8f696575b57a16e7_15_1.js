function () {
            var url = fluid.stringTemplate(that.options.searchUrl, {
                recordtype: that.model.recordType,
                vocab: that.model.vocabs ? ("&" + $.param({
                    vocab: that.model.vocabSelection
                })) : "",
                keywords: that.model.keywords
            });
            window.location = url;
        }