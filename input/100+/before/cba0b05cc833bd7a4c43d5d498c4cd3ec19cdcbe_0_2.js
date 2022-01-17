function () {
        if (!required_params_present()) {
            return
        }

        var database_type = type_of_databases();
        var sequence_type = type_of_sequences();

        //database type is always known
        switch (database_type) {
            case 'protein':
                switch (sequence_type) {
                    case undefined:
                      return ['blastp', 'blastx'];
                    case 'protein':
                        return ['blastp'];
                    case 'nucleotide':
                        return ['blastx'];
                }
            case 'nucleotide':
                switch (sequence_type) {
                    case undefined:
                      return ['tblastn', 'blastn', 'tblastx'];
                    case 'protein':
                        return ['tblastn'];
                    case 'nucleotide':
                        return ['blastn', 'tblastx'];
                }
        }
    }