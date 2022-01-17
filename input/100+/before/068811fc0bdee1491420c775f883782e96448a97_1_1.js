function () {



    $("#AminoTable tbody").toggle();

    $("#AminoTable th").hover(function () {

        $("#AminoTable tbody").toggle('fast');

    });

    // whenever somebody clicks on 'button1', we want the stats to be recalculated and displayed
    $("#button1").click(function () {

        // this is a jQuery selector:  it finds the DOM element with id = 'protein'
        var sequence = $("#protein").val(),
            // this grabs some data from our model 
            aaPercs = Statistics.runWeights(sequence),
            aa,
            // this jQuery selector gets the 'tbody' element of the element with id = 'AminoTable'
            tbody = $("#AminoTable tbody"),
            acidseq = Statistics.loadSequence(sequence),
            weight = $("#weight"),
            length = $("#length"),
            hydrophilic = $("#hydrophilic"),
            hydrophobic = $("#hydrophobic"),
            positive = $("#positive"),
            negative = $("#negative"),
            numHydrophobic = Statistics.calcNumHydrophilic(acidseq)*100 / acidseq.length,
            numHydrophilic = Statistics.calcNumHydrophobic(acidseq)*100 / acidseq.length,
            perHydrophobic = numHydrophobic.toPrecision(4),
            perHydrophilic = numHydrophilic.toPrecision(4),
            numPositive = Statistics.calcNumPositive(acidseq)*100 / acidseq.length,
            numNegative = Statistics.calcNumNegative(acidseq)*100 / acidseq.length,
            perPostive = numPositive.toPrecision(4),
            perNegative = numNegative.toPrecision(4);
        weight.text(Statistics.getMolecularWeight(acidseq).toPrecision(6));
        length.text(sequence.length);
        hydrophilic.text(perHydrophilic);
        hydrophobic.text(perHydrophobic);
        positive.text(perHydrophilic);
        negative.text(perHydrophobic);
        // get rid of the old data ...
        tbody.empty();
        // and and in the new
        for (aa in aaPercs) {
            // make one row for each amino acid
            tbody.append("<tr><td>" + aa + "</td><td>" + aaPercs[aa] + "</td></tr>");
        }

    });
}