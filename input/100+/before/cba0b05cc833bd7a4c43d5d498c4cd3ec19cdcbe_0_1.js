function (sequence) {
        // remove 'noisy' characters
        sequence = sequence.replace(/[^A-Z]/gi, '') // non-letter characters
        sequence = sequence.replace(/[NX]/gi,   '') // ambiguous  characters

        // can't determine the type of ultrashort queries
        if (sequence.length < 10) { return undefined }

        var putative_NA_count, threshold, i;
        putative_NA_count = 0;
        threshold = 0.9 * sequence.length;

        // count the number of putative NA
        for (i = 0; i < sequence.length; i++) {
            if (sequence[i].match(/[ACGTU]/i)) {
                putative_NA_count += 1;
            }
        }

        return putative_NA_count > threshold ? 'nucleotide' : 'protein'
    }