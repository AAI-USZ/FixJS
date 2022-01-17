function redirect( loc ) {
            // 非string不做处理
            if ( typeof loc != 'string' ) {
                return;
            }
           
            // 增加location带起始#号的容错性
            // 可能有人直接读取location.hash，经过string处理后直接传入
            loc = loc.replace( /^#/, '' );
 
            // 空string当成DEFAULT_INDEX处理
            if ( loc.length == 0 ) {
                loc = getConfig( 'DEFAULT_INDEX' ); 
            }

            // 未设置path时指向当前path
            if ( /^~/.test( loc ) ) {
                loc = currentPath + loc
            }
            
            // 如果locacion中包含encodeURI过的字符
            // firefox会自动decode，造成传入的loc和getLocation结果不同
            // 所以需要提前写入，获取真实的hash值
            if ( baidu.browser.firefox && /%[0-9A-F]/i.test( loc ) ) {
                location.hash = loc;
                loc = getLocation();
            }  

            // 与当前location相同时不进行转向
            updateLocation( loc );
            /*if (!updateHash(loc)) {
                return;
            }*/

            loc = currentLocation;
            // 触发onredirect事件
            locator_.onredirect();
            
            // ie下使用中间iframe作为中转控制
            // 其他浏览器直接调用控制器方法
            if ( baidu.ie && baidu.ie < 8 ) {
                ieForword( currentPath, currentQuery, loc );
            } else {
                controller_.forward( currentPath, currentQuery, loc );
            }
        }