function(provider) {
        let providerBox = new St.BoxLayout({ style_class: 'search-section',
                                             vertical: true });
        let title = new St.Label({ style_class: 'search-section-header',
                                   text: provider.title });
        providerBox.add(title);

        let resultDisplayBin = new St.Bin({ style_class: 'search-section-results',
                                            x_fill: true,
                                            y_fill: true });
        providerBox.add(resultDisplayBin, { expand: true });
        let resultDisplay = provider.createResultContainerActor();
        if (resultDisplay == null) {
            resultDisplay = new GridSearchResults(provider);
        }
        resultDisplayBin.set_child(resultDisplay.actor);

        this._providerMeta.push({ provider: provider,
                                  actor: providerBox,
                                  resultDisplay: resultDisplay });
        this._content.add(providerBox);
    }