function(type) {
        if( type === "columns" ){
            return { columns : self.columns };
        } else if( type === "rows" ){
            return { rows : $.extend(true, {}, self.rows.get()) };
        } else if( type === "mode" ){
            return { mode : self.mode };
        } else {
            return { columns : self.columns, 
                    rows : $.extend(true, {}, self.rows.get()), 
                    mode : self.mode };
        }
    }