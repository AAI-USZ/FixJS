function execImport( importStat ) {
        var target = getTarget( importStat.id );
        return exec( target );
    }