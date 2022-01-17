function () {
        var me        = this,
            html      = [],
            total     = me.total,
            startNumber = this.startNumber,
            last      = total + startNumber - 1,
            page      = me.page + startNumber, // 恶心
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
        if ( page < me.showCount - 1 ) {
            begin = 0;
        } else if ( page > total - me.showCount ) {
            begin = total - me.showCount;
        } else {
            begin = page - Math.floor( me.showCount / 2 );
        }

        if ( begin < 0 ) {
            begin = 0
        }
        
        // 绘制前一页的link
        if (page > 0) {
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
        if ( begin > 0 ) {
            html.push(
                me._getItemHtml(
                    1,
                    itemClass,
                    this.__getStrCall( '_setPage', 0 )
                ),
                omitWord );
        }

        // 绘制中间的序号
        for ( i = 0; i < me.showCount && begin + i < total; i++ ) {
            if ( begin + i != page ) {
            html.push(
                me._getItemHtml(
                    1 + begin + i,
                    itemClass,
                    me.__getStrCall( '_setPage', begin + i )
                ) );
            } else {
                html.push(
                    me._getInfoHtml(
                        1 + begin + i, 
                        itemClass + ' ' + me.__getClass( 'selected' )
                    ) );
            }
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