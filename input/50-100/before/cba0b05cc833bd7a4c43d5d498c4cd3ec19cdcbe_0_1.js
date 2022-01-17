function () {
        var sequences = $('#sequence').val().split(/>.*/);
        var type, tmp, i;

        for (i = 0; i < sequences.length; i++) {
            tmp = guess_sequence_type(sequences[i]);

            // could not guess the sequence type; try the next sequence
            if (!tmp) { continue }

            if (!type) {
              // successfully guessed the type of atleast one sequence
              type = tmp
            }
            else if (tmp !== type) {
              // user has mixed different type of sequences
              return 'mixed'
            }
        }

        return type;
    }