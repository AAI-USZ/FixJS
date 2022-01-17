function () {
        var me        = this,
            html      = [],
            total     = me.total,
            startNumber = this.startNumber,
            last      = total + startNumber - 1,
            page      = me.page, // 恶心
            itemClass = me.__getClass( 'item' ),
            disClass  = me.__getClass( 'disabled' ),
            prevClass = me.__getClass( 'prev' ),
            nextClass = me.__getClass( 'next' ),
            omitWord  = me._getInfoHtml( me.omitText, me.__getClass( 'omit' ) ),
            i, begin;
        
        if ( total <= 0 ) {
            this.main.innerHTML = '';
            return;
        }
                
        // 计算起始页
        // 如果页码还不到最大显示页码数（即开始几页），如最大显示5个页码，当前页码3
        if ( page - startNumber < me.showCount - 1 ) {
            begin = startNumber;
        } else if ( page - startNumber > total - me.showCount ) { // 最后几页
            begin = total - me.showCount + startNumber;
        } else { // 中间几页
            begin = page - Math.floor( me.showCount / 2 ) + startNumber;
        }

        if ( begin < startNumber ) {
            begin = startNumber;
        }
        
        // 绘制前一页的link
        if (page > startNumber) {
            html.push( 
                me._getItemHtml(
                    me.prevText,
                    prevClass,
                    me.__getStrCall( '_setPage', page - 1 )
                ) );
        } else {
            html.push( me._getInfoHtml( me.prevText, prevClass + ' ' + disClass ) );
        }
        
        // 绘制前缀
        if ( begin > startNumber ) {
            html.push(
                me._getItemHtml(
                    1,
                    itemClass,
                    this.__getStrCall( '_setPage', startNumber )
                ),
                omitWord );
        }

        // 绘制中间的序号
        for ( i = 0; i < me.showCount && begin + i - startNumber < total; i++ ) {
            var isCur = begin + i == page;
            html.push(
                me._getItemHtml(
                    begin + i + 1 - startNumber,
                    itemClass + (isCur ? ' ' + me.__getClass( 'selected' ) : ''),
                    isCur ? '' : me.__getStrCall( '_setPage', begin + i )
                ) );
        }
        
        // 绘制后缀
        if ( begin < total - me.showCount ) {
            html.push(
                omitWord,
                me._getItemHtml(
                    total,
                    itemClass,
                    me.__getStrCall( '_setPage', last )
                ) );
        }
        
        
        // 绘制后一页的link
        if ( page < last ) {
            html.push(
                me._getItemHtml(
                    me.nextText,
                    nextClass,
                    me.__getStrCall( '_setPage', page + 1) 
                ) );
        } else {
            html.push( me._getInfoHtml( me.nextText, nextClass + ' ' + disClass ) );
        }
        
        this.main.innerHTML = esui.util.format( me._tplMain, html.join('') );
    }