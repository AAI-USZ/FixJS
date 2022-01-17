function() {

        this.addEvents("feed-added");

        this.sourceTypeRadioList = new Ext.form.RadioGroup({
            fieldLabel: 'Type',
            columns: [500],
            labelWidth: 100,
            items: [
                {name: 'source_type', inputValue: 'gx_picasasource', boxLabel: this.addPicasaText},
                {name: 'source_type', inputValue: 'gx_youtubesource', boxLabel: this.addYouTubeText},
                {name: 'source_type', inputValue: 'gx_hglfeedsource', boxLabel: this.addHGLText},
                {name: 'source_type', inputValue: 'gx_feedsource', boxLabel: this.addRSSText, checked: true}
            ],
            listeners: {
                "change": function(radiogroup, radio) {
                    if (radio && radio.inputValue == "gx_feedsource") {
                        this.urlTextField.show();
                        this.keywordTextField.hide();
                        this.maxResultsField.hide();
                        this.symbolizerField.show();
                    } else {
                        this.urlTextField.hide();
                        this.keywordTextField.show();
                        this.maxResultsField.show();
                        this.symbolizerField.hide();
                    }
                },
                scope: this
            }
        });

        this.urlTextField = new Ext.form.TextField({
            fieldLabel: "URL",
            allowBlank: false,
            //hidden: true,
            width: 240,
            msgTarget: "right",
            validator: this.urlValidator.createDelegate(this)
        });

        this.keywordTextField = new Ext.form.TextField({
            fieldLabel: this.keywordText,
            allowBlank: true,
            width: 150,
            msgTarget: "right"
        });

        this.titleTextField = new Ext.form.TextField({
            fieldLabel: this.titleText,
            allowBlank: true,
            width: 150,
            msgTarget: "right"
        });

        this.maxResultsField = new Ext.form.ComboBox({
            fieldLabel: 'Maximum # Results',
            hidden: true,
            hiddenName: 'max-results',
            store: new Ext.data.ArrayStore({
                fields: ['max-results'],
                data : [[10],[25],[50],[100]]
            }),
            displayField: 'max-results',
            mode: 'local',
            triggerAction: 'all',
            emptyText:'Choose number...',
            labelWidth: 100,
            defaults: {
                labelWidth: 100,
                width:100
            }
        });


        this.symbolizerField = new gxp.PointSymbolizer({
            bodyStyle: {padding: "10px"},
            border: false,
            hidden: false,
            labelWidth: 70,
            defaults: {
                labelWidth: 70
            },
            symbolizer: {pointGraphics: "circle", pointRadius: "5"}
        });


        this.symbolizerField.find("name", "rotation")[0].hidden = true;

        if (this.symbolType === "Point" && this.pointGraphics) {
            cfg.pointGraphics = this.pointGraphics;
        }

        this.submitButton =  new Ext.Button({
            text: this.addFeedText,
            handler: function() {
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

            },
            scope: this
        });

        this.panel = new Ext.Panel({
            items: [
                this.sourceTypeRadioList,
                this.titleTextField,
                this.urlTextField,
                this.keywordTextField,
                this.maxResultsField,
                this.symbolizerField,
                this.submitButton
            ],
            layout: "form",
            border: false,
            labelWidth: 100,
            bodyStyle: "padding: 5px",
            autoWidth: true,
            autoHeight: true
        });

        this.items = this.panel;

        gxp.FeedSourceDialog.superclass.initComponent.call(this);

    }