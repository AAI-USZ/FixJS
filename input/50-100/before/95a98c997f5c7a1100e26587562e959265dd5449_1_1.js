function (directions, useforce) {
            if ( ! directions )
                return this._base
            directions = directions.split('.')
            var topic = this._base,
                edge,
                len = directions.length,
                i = 0
            
            if ( len ) {
                do {
                    edge = directions[i++]
                    if ( topic[edge] instanceof Topic )
                        topic = topic[edge]
                    else
                        if ( useforce )
                            topic = topic[edge] = new Topic
                        else
                            break
                } while ( i < len )
            }
            return topic
        }