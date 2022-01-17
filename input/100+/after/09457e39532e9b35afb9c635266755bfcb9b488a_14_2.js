function(stream, state) {
        /* Parse GFM double bracket links */
        if ((ch = stream.peek()) != undefined && ch == '[') {
            stream.next(); // Advance the stream

            /* Only handle double bracket links */
            if ((ch = stream.peek()) == undefined || ch != '[') {
                stream.backUp(1);
                return state.token(stream, state);
            } 

            while ((ch = stream.next()) != undefined && ch != ']') {}

            if (ch == ']' && (ch = stream.next()) != undefined && ch == ']') 
                return 'link';

            /* If we did not find the second ']' */
            stream.backUp(1);
        }

        /* Match GFM latex formulas, as well as latex formulas within '$' */
        if (stream.match(/^\$[^\$]+\$/)) {
            return "string";
        }

        if (stream.match(/^\\\((.*?)\\\)/)) {
            return "string";
        }

        if (stream.match(/^\$\$[^\$]+\$\$/)) {
            return "string";
        }
        
        if (stream.match(/^\\\[(.*?)\\\]/)) {
            return "string";
        }

        return state.token(stream, state);
    }