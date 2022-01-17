function successFunction(responseObject) {
        idealdata = Ext.decode(responseObject.responseText);

        //Updating desired data table
        var counter = 0;
        changes = ['twotheta', 'theta', 'omega', 'chi', 'phi'];
        for (var i = 0; i < structureFactors.resultsStore.getCount(); i++){
            var record = structureFactors.resultsStore.getAt(i);

            if (record.data['h'] != 0 || record.data['k'] != 0 || record.data['l'] != 0){
                //if it's not a (0,0,0) vector, update its calculated angles
                if (idealdata[counter] === 'Error') {
                    //setting up the error message
                    record.set('twotheta', 'Invalid');
                    record.set('theta', 'Vector!');
                    record.set('omega', 'Not in');
                    record.set('chi', 'Scattering');
                    record.set('phi', 'Plane.');
                }
                else{
                    for (var c in changes) {
                        var fieldName = changes[c];
                        record.set(fieldName, idealdata[counter][fieldName]);
                    }

                }
                counter = counter+1;
            }
        }

        resultsStore.commitChanges();
    }