function(data)
        {
            // get the important list data from request
            var extractListData = function(data)
            {
                var ret = data;
                if( !Array.isArray(data) ) for( i in data ) 
                {
                    if( $.isArray(data[i]) )
                    {
                        ret = data[i];
                        break;
                    }
                }
                return ret;
            },
            theData = extractListData(data);
            list = [];
            for( var i in theData )
                list.push( new this.model(theData[i]) );
            
            return {list: list, total: data.total}
        }