function(val)
            {
                if(this.get("dataProvider"))
                {
                    val = this._parseSeriesCollection(val);
                }
                return val;
            }