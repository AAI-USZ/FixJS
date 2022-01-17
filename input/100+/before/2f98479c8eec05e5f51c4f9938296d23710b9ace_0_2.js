function _setupNewSpecies() {

    if (Edgar.mapmode === 'current' && Edgar.newSpecies != Edgar.mapdata.species) {

        consolelog('new species!');

        // set up for the species stored in Edgar.newSpecies
        var oldSpecies = Edgar.mapdata.species;
        var newSpecies = Edgar.newSpecies;

        clearExistingSpeciesOccurrencesAndDistributionLayers();
        Edgar.mapdata.species = newSpecies;
        addSpeciesOccurrencesAndDistributionLayers();

        // just handle the panel update stuff here.
        // the map updates will be handled in event listeners that
        // listen for the specieschanged event.

        $('#species_autocomplete').val(newSpecies.label);  // set the dropdown's content 
        $('#species_autocomplete').val('');  // set the dropdown's content
        $('#currentspecies h1').text(newSpecies.commonName || '(no common name)');  // set the static panel names
        $('#currentspecies h2').text(newSpecies.scientificName);  // set the static panel names

        var status = newSpecies.remodelStatus;
        var dirty = newSpecies.numDirtyOccurrences;
        var statusText = "";

        if (status.indexOf("Remodelling running") != -1) {
            statusText = "Modelling is <em>now running</em> to incorporate ";
            statusText += Edgar.util.pluralise(dirty, "changed observation");
            statusText += " into the climate suitability for this species."
            // TODO hide queue-now button
        } else if (status.indexOf("Priority queued") != -1) {
            statusText = "Modelling is <em>queued</em> to incorporate ";
            statusText += Edgar.util.pluralise(dirty, "changed observation");
            statusText += " into the climate suitability for this species."
            // TODO hide queue-now button
        } else if (dirty > 0) {
            statusText = "There are ";
            statusText += Edgar.util.pluralise(dirty, "changed observation");
            statusText += " <em>not yet incorporated</em> into the climate";
            statusText += " suitability for this species.";
            // TODO show queue-now button
        } else {
            statusText = 'Climate suitability modelling for this species is <em>up to date</em>.';
            // TODO hide queue-now button
        }

        $('#currentspecies .status').html(statusText);

        updateWindowHistory();

        Edgar.newSpecies = null;

        $(Edgar.map).trigger('specieschanged', oldSpecies);
    }
}