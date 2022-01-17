function( data, sep ) {
            if( !data )
                return '';
            
            sep = sep || '\t';
            
            for( i = 0; i < data.length; i++ ) {
            
                // All tablumps start with &!
                if( data[i] != '&' )
                    continue;
                
                // We want to work on extracting the tag. First thing is split
                // the string at the current index. We don't need to parse
                // anything to the left of the index.
                primer = data.substring(0, i);
                working = data.substring(i);
                
                // Next make sure there is a tab character ending the tag.
                ti = working.indexOf('\t');
                if( ti == -1 )
                    continue;
                
                // Now we can crop the tag.
                tag = working.substring(0, ti + 1);
                working = working.substring(ti + 1);
                lump = this.lumps[tag];
                
                // If we don't know how to parse the tag, leave it be!
                if( lump === undefined )
                    continue;
                
                // Crop the rest of the tablump!
                cropping = this.tokens(working, lump[0], sep);
                
                // Parse the tablump.
                if( typeof(lump[1]) == 'string' )
                    parsed = lump[1].format.apply(lump[1], cropping[0]);
                else
                    parsed = lump[1](cropping[0]);
                
                // Glue everything back together.
                data = primer + parsed + cropping[1];
                i = i + (parsed.length - 2);
                
            }
            
            // Replace the simpler tablumps which do not have arguments.
            data = data.replace(this.repl[0], this.repl[1]);
            
            return data;
        }