function ( valueAsDate ) {
        if ( !valueAsDate ) {
            return;
        }

        var me = this;
        me.valueAsDate = valueAsDate;
        
        me.getLayer()._controlMap.monthview.setValueAsDate( valueAsDate );
        baidu.g( me.__getId('text') ).innerHTML = baidu.date.format( valueAsDate, me.dateFormat );
    }