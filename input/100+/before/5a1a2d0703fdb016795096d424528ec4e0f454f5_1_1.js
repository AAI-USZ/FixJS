function() {
                var ptype = this.sourceTypeRadioList.getValue().inputValue;
                var config = {
                    "title" : this.titleTextField.getValue(),
                    "group" : "GeoRSS Feeds"
                };

                if (ptype != "gx_feedsource") {
                    config.params = {"q" : this.keywordTextField.getValue(), "max-results" : this.maxResultsField.getValue()}

                } else {
                    config.url = this.urlTextField.getValue();
                    var symbolizer = this.symbolizerField.symbolizer
                    config.defaultStyle = {};
                    config.selectStyle = {};
                    Ext.apply(config.defaultStyle, symbolizer);
                    Ext.apply(config.selectStyle, symbolizer);
                    Ext.apply(config.selectStyle, {
                        fillColor: "Yellow",
                        pointRadius: symbolizer["pointRadius"] + 1
                    });
                }

                this.fireEvent("feed-added", ptype, config);

            }