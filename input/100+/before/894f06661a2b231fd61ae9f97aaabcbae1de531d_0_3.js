function (personUuid) {
        var identifiers = Ext.create('Registration.store.identifiersType')
        identifiers.load();
        identifiers.on('load', function () {
            var idIterator;
            var idNo = -1;
            for (idIterator = 0; idIterator < identifiers.data.length; idIterator++) {
                var str = identifiers.data.items[idIterator].raw.display;
                if (str.match(idPattern)) {
                    idNo = idIterator;
                }
            }
            if (idNo === -1) {
                console.log('ERROR: Could not find identifier type \''+ idPattern.source.match(/[\w ]+/g) +'\' in OpenMRS instance.');
            } else {
                // this statement calls getlocation() as soon as the get call is successful
                this.getlocation(personUuid, identifiers.getAt(idNo).getData().uuid);
            }
        }, this);
    }