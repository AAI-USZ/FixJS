function () {
        var currentPath     = '',
            currentQuery    = '',
            currentLocation = '',
            IFRAME_CONTENT  = "<html><head></head><body>"
                + "<script type=\"text/javascript\">"
                + "var path = \"#{0}\";"
                + "var query = #{1};"
                + "var loc = \"#{2}\";"
                + "parent.er.locator._updateHash(loc);"
                + "parent.er.controller.forward(path, query, loc);"
                + "window.onload = function () {document.getElementById('save').value = loc;};"
                + "</script><input type=\"text\" id=\"save\"></body></html>";
        
        /**
         * 获取location信息
         * 
         * @public
         * @return {string}
         */
        function getLocation() {
            var hash = location.hash;
            if ( hash ) {
                return hash.replace( /^#/, '' );
            }
            
            return '';
        }
        
        /**
         * 更新hash信息
         *
         * @private
         * @param {string} loc
         */
        function updateLocation( loc ) {
            var locResult   = parseLocation( loc ),
                path        = locResult.path,
                query       = locResult.query,
                historyList,
                historyInput,
                isOldLoc,
                i, 
                len;
            
            if ( baidu.ie ) {
                historyInput = baidu.g( getConfig( 'CONTROL_INPUT_ID' ) );

                if ( historyInput ) {
                    if ( !/(~|&)_ietag=([a-z0-9]+)(&|$)/.test( loc ) ) {
                        if ( loc.indexOf('~') > 0 ) {
                            loc += '&';
                        } else {
                            loc += '~';
                        }
                        
                        loc += '_ietag=' + random();
                    }

                    historyList = baidu.json.parse( historyInput.value );

                    for ( i = 0, len = historyList.length; i < len; i++ ) {
                        if ( historyList[ i ].loc == loc ) {
                            isOldLoc = i;
                            break;
                        }
                    }

                    if ( typeof isOldLoc != 'number' ) {
                        historyList.push({
                            path:path, 
                            query:query, 
                            loc:loc
                        });
                    } else {
                        randomMap_[ RegExp.$2 ] = 1;
                    }

                    historyInput.value = baidu.json.stringify( historyList );
                }
            }
            
            // 存储当前信息
            currentPath = path;
            currentQuery = query;
            currentLocation = loc;
            location.hash = loc;

            return true;
        }

        /**
         * 控制定位器转向
         * 
         * @public
         * @param {string} loc location位置
         */
        function redirect( loc ) {
            // 空string和非string不做处理
            if ( !loc || typeof loc != 'string' ) {
                return;
            }
            
            // 增加location带起始#号的容错性
            // 可能有人直接读取location.hash，经过string处理后直接传入
            loc = loc.replace( /^#/, '' );

            // 未设置path时指向当前path
            if ( /^~/.test( loc ) ) {
                loc = currentPath + loc
            }
            
            // 如果locacion中包含encodeURI过的字符
            // firefox会自动decode，造成传入的loc和getLocation结果不同
            // 所以需要提前写入，获取真实的hash值
            if ( baidu.browser.firefox ) {
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
            if ( baidu.ie ) {
                ieForword( currentPath, currentQuery, loc );
            } else {
                controller_.forward( currentPath, currentQuery, loc );
            }
        }
        
        /**
         * IE下调用控制器forword
         * 
         * @private
         * @param {Object} path 路径
         * @param {Object} query 查询条件
         * @param {string} loc 定位器
         */
        function ieForword( path, query, loc ) {
            var iframe = baidu.g( getConfig( 'CONTROL_IFRAME_ID' ) ),
                iframeDoc = iframe.contentWindow.document;

            iframeDoc.open( 'text/html' );
            iframeDoc.write(
                baidu.format(
                    IFRAME_CONTENT, 
                    escapeIframeContent( path ), 
                    (query ? '"' + escapeIframeContent( query ) + '"' : 'null'), 
                    escapeIframeContent( loc )
                ));
            iframeDoc.close();
        }

        /**
         * iframe内容字符串的转义
         *
         * @private
         * @param {string} 源字符串
         * @return {string}
         */
        function escapeIframeContent( source ) {
            return source.replace( /\\/g, "\\\\" ).replace( /\"/g, "\\\"" );
        }

        /**
         * 解析location
         * 
         * @private
         * @param {Object} loc
         */
        function parseLocation( loc ) {
            loc = loc.replace( /^#/, '' );
            var pair = loc.match( /^([^~]*)(~(.*))?$/ ),
                re = {};
                
            re.path  = pair[ 1 ] || getConfig( 'DEFAULT_INDEX' );
            re.query = (pair.length == 4 ? pair[ 3 ] : '');
            return re;
        }
        
        /**
         * 获取参数集合
         * 
         * @return {Object}
         */
        function getQueryMap() {
            return parseQuery( currentQuery );
        }
        
        /**
         * 将参数解析为Map
         * 
         * @public
         * @param {string} query 参数字符串
         * @return {Object}
         */
        function parseQuery( query ) {
            query = query || '';
            var params      = {},
                paramStrs   = query.split( '&' ),
                len         = paramStrs.length,
                item,
                value;
    
            while ( len-- ) {
                item = paramStrs[ len ].split( '=' );
                value = item[ 1 ];
                
                // firefox在读取hash时，会自动把encode的uri片段进行decode
                if ( !baidu.browser.firefox ) {
                    value = decodeURIComponent( value );
                }
                
                params[ item[ 0 ] ] = value;
            }
            
            return params;
        }
        
        /**
         * 获取location的path
         * 
         * @return {string}
         */
        function getPath() {
            return currentPath;
        }
        
        /**
         * 获取location的query
         * 
         * @return {string}
         */
        function getQuery() {
            return currentQuery;
        }  
        
        /**
         * 初始化locator
         */
        function init() {
            // 初始化默认的index
            if ( !getLocation() ) {
                location.hash = getConfig( 'DEFAULT_INDEX' );
            }

            /**
             * @private
             */
            function changeListener() {
                var loc = getLocation();
                if ( loc != currentLocation ) {
                    locator_.redirect(loc);
                }
            }
            
            if ( baidu.ie ) {
                ieIframeRecorderInit();
                ieInputRecorderInit();
            }
            
            setInterval( changeListener, 100 );
        }
        
        /**
         * ie下用于记录与历史数据的input初始化
         *
         * @private
         */
        function ieInputRecorderInit() {
            var input      = baidu.g( getConfig( 'CONTROL_INPUT_ID' ) ),
                currentLoc = location.hash.replace( /^#/, '' ),
                currentIndex,
                historyList,
                i, len, item;

            if ( !input ) {
                return;
            }
            
            input.value = input.value || '[]';
            historyList = baidu.json.parse( input.value );
            
            // 记录一遍ietag
            for ( i = 0, len = historyList.length; i < len; i++ ) {
                item = historyList[ i ];
                if ( /_ietag=([a-z0-9]+)(&|$)/.test( item.loc ) ) {
                    randomMap_[ RegExp.$1 ] = 1;
                }
            }

            controller_._enable( 0 );
            for ( i = 0; i < len; i++ ) {
                item = historyList[ i ];
                if ( item.loc == currentLoc ) {
                    currentIndex = i;
                    (i == len - 1) && controller_._enable( 1 );
                }
                ieForword( item.path, item.query, item.loc );
            }

            controller_._enable( 1 );
            i -= ( currentIndex + 1 );
            i && history.go( -i );
        }

        /**
         * ie下用于记录与控制跳转的iframe初始化
         *
         * @private
         */
        function ieIframeRecorderInit() {
            // 具有input记录历史信息的时候
            // 历史行为iframe的id需要变更
            // 避免先前的历史被保存
            if ( baidu.g( getConfig( 'CONTROL_INPUT_ID' ) ) ) {
                er.config.CONTROL_IFRAME_ID = getConfig('CONTROL_IFRAME_ID') + (new Date).getTime();
            } 

            ieIframeRecorderCreate();
        }
        
        /**
         * ie下创建记录与控制跳转的iframe
         *
         * @private
         */
        function ieIframeRecorderCreate() {
            var iframe = document.createElement('iframe'),
                size   = 200,
                pos    = '-1000px';

            iframe.id       = getConfig( 'CONTROL_IFRAME_ID' );
            iframe.width    = size;
            iframe.height   = size;
            iframe.src      = "about:blank";

            iframe.style.position   = "absolute";
            iframe.style.top        = pos;
            iframe.style.left       = pos;

            document.body.appendChild(iframe);
        }

        // 返回暴露的方法
        return {
            'redirect'          : redirect,
            'getPath'           : getPath,
            'getQuery'          : getQuery,
            'getLocation'       : getLocation,
            'getQueryMap'       : getQueryMap,
            'parseQuery'        : parseQuery,
            'init'              : init,
            '_updateHash'       : updateLocation,
            'onredirect'        : new Function()
        };
    }