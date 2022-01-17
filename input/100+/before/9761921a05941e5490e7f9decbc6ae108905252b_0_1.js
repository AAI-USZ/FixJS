function(url, target_div) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.status != 200) {
                target_div.innerHTML = 'Lookup Error.';
            }
            else if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var result = eval('(' + xmlhttp.responseText + ')');
                if (result.status == "ok") {
                    var define = result.result;
                    target_div.innerHTML = '<span style="color:red">' + define.word
                        + '</span> [<span style="color:green">' + define.pron
                        + '</span>] ' + define.pos + ' <span style="color:blue">'
                        + define.acceptation + "</span><br><br>" + define.gloss;
                }
                else {
                    target_div.innerHTML = result.key + ' Not Found.';
                }
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send(null);
    }