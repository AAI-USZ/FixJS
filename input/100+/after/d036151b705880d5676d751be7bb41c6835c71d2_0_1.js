function(str, type) {
                var result = '';
                if (type == 'if') {
                    result = str.replace(/{{([^}]+)}}/, '$1') + '{';
                } else if (type == 'elseif' || type == 'else') {
                    result = '}' + str.replace(/{{([^}]+)}}/, '$1') + '{';
                } else if (type == 'for') {
                    var list = str.match(/data=([\S]+)\s*/)[1];
                    var key = str.match(/key=(\w+)\s*/)[1] || '_key';
                    var item = str.match(/item=(\w+)\s*/)[1] || '_item';
                    if(list.length) {
                        result = 'for(var ' + key + '=0; ' + key + '<' + list + '.length;' + key + '++){var ' + item + '=' + list + '[' + key + '];'
                    } else {
                        result = 'for(var ' + key + ' in ' + list + '){var ' + item + '=' + list + '[' + key + '];'
                    }                   
                } else if (type == 'endif' || type == 'endfor') {
                    result = '}';
                }
                return result;
            }