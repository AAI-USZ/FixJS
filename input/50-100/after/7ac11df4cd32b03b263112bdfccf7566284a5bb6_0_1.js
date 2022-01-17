function( url, scripts, node ){
            scripts = DOC.getElementsByTagName( "script" );
            node = scripts[ scripts.length - 1 ];//FF下可以使用DOC.currentScript
            url = node.hasAttribute ?  node.src : node.getAttribute( 'src', 4 );
            $["@name"] = node.getAttribute("namespace") || "$"
            var str = node.getAttribute("debug")
            $["@debug"] = str == 'true' || str == '1';
            return url.substr( 0, url.lastIndexOf('/') );
        }