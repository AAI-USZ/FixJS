function(val)
            {
                if(this.get("dataProvider"))
                {
                    val = this._setAxes(val);
                }
                return val;
            }