function execImport( importStat, scope ) {
        var target = getTarget( importStat.id );
        return exec( target, scope );
    }