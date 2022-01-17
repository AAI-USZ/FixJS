function () {
        var me   = this,
            main = me.main,
            data = me.datasource,
            title,
            label = me._label,
            value;
        
        esui.InputControl.prototype.render.call( me );
        
        // 初始化click事件
        if ( !me._mainClick ) {
            me._mainClick = me.__getClickHandler();
            main.onclick  = me._mainClick;
        }

        // 插入点击相关的label元素
        if ( !label ) {
            label = document.createElement( 'label' );
            label.className = me.__getClass( 'label' );
            esui.lib.setAttribute( label, 'for', main.id );

            esui.lib.insertAfter( label, main );
            me._label = label;
        }

        // 初始化label的内容
        title = me.title || main.title || me.getValue();
        label.innerHTML = esui.lib.encodeHTML( title );
        
        // 初始化disabled
        me.setDisabled ( !!me.disabled );

        // 初始化value
        me.value && me.setValue( me.value );
        value = me.getValue();
        
        // 初始化checked
        switch ( typeof data ) {
        case 'string':
        case 'number':
            me.setChecked( data == value );
            break;

        default:
            if ( data instanceof Array ) {
                me.setChecked( esui.lib.inArray( data, value ) );
            }
            break;
        }
    }