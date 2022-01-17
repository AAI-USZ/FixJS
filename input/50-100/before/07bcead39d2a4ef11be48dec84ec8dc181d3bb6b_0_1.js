function ( phonetic ) {
        var code = phonetic.charCodeAt(0);

        // Zulu (also catches Juliet time, which is unassigned)
        if ( code === 90 || code === 74 )
            return 0;
        // Alpha (+1) to India (+9)
        if ( code >= 65 && code <= 73 )
            return (code - 64);
        // Kilo (+10) to Mike (+12)
        if ( code >= 75 && code <= 77 )
            return (code - 65);
        // November (-1) to Yankee (-12)
        if ( code >= 78 && code <= 89 )
            return (0 - (code-78));    
    }