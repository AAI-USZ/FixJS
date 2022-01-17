f        //去掉attr="",谁可以优化一下这个正则？
        html = html.replace(/((\{{2,3}\#(.+)?\}{2,3})([\s\S]*)?\s*(\{{2,3}~\3\}{2,3}))\=\"\"/g, '$1');

        //对if语句的处理
        html = html.replace(/(\{{2,3}[\^#~]?)iftmplbrick\_(\d+)(\}{2,3})/g, function(w, i, j, k) {
            return i + arr[parseInt(j,10)] + k;
        });

        //将~符号替换回/，完美了。
        html = html.replace(/(\{{2,3})~/g, '$1/');
        //修复火狐下对a标签href编码的bug
        if(UA.firefox){
            return decodeURIComponent(html);
        }
        return html;
    }
