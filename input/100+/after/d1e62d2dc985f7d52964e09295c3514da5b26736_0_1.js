function(data)
        {
            for( var i in data ) 
            {
                if( this.defaults[i] )
                    switch(true)
                    {
                        case typeof this.defaults[i] === 'function': // a model or collection constructor
                            console.group('inside parse: ' + i)
                            console.dir(this.defaults[i].prototype);
                            console.dir(new this.defaults[i](data[i].href));
                            this.data[i] = new this.defaults[i](data[i].href);
                            //!data[i].href && this.data[i].relationHash(data[i]);
                            console.groupEnd();
                            continue;
                            break;
                        case $.isArray(this.defaults[i]): // a collection
                            delete this.data[i];
                            this.data[i] = new Collection(this.defaults[i][0], data[i].href); 
                            continue;
                            break;
                        case this.defaults[i] instanceof Collection: // an already defined collection
                            this.data[i] = this.defaults[i];
                            continue;
                            break;
                    }
                this.data[i] = data[i];
            }
        }