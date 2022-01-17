function()
        {
            if( !this.model ) this.model = Model;
            this._list = [];
            this.options = {};
            this.desynced = true;
            
            var buildData = buildOptions = function(){ void(0); },
                self = this;
                        
            for( var i in arguments ) 
            {
                switch( Object.prototype.toString.call(arguments[i]) )
                {
                    case '[object Function]': // a model
                        this.model = arguments[i]; 
                        break;
                    case '[object String]': // a data source
                        this.options.href = arguments[i]; 
                        break;
                    case '[object Array]': // a list of models, a function we're going to call after setting options
                        buildData = (function(args){ return function(){ this._list = this.parse(args); }})(arguments[i]); 
                        break;
                    case '[object Object]': // options, same technique as above
                        buildOptions = (function(args){ return function(){ this.options = args; }})(arguments[i]);
                        break;
                }
            }
            // callbacks in order
            buildOptions.call(this);
            buildData.call(this);
        }