function parseTwitter(text){
        var indexAt = 0;
        var result = "";
        while (indexAt != text.length){
            var foundHashAt = text.indexOf("#",indexAt);
            var foundAtAt = text.indexOf("@",indexAt);
            if (foundHashAt == -1 && foundAtAt == -1){
                result += text.substring(indexAt);
                break;
            }
            else if (foundAtAt != -1 && (foundAtAt < foundHashAt || foundHashAt == -1)){
                result += text.substring(indexAt,foundAtAt);
                var foundSpaceAt = text.indexOf(" ",foundAtAt);
                var foundLineBreakAt = text.indexOf("\n",foundAtAt);
                if (foundSpaceAt == -1 || (foundLineBreakAt != -1 && foundLineBreakAt < foundSpaceAt))
                    foundSpaceAt = foundLineBreakAt;
                var foundTabAt = text.indexOf("\t",foundAtAt);
                if (foundSpaceAt == -1 || (foundTabAt != -1 && foundTabAt < foundSpaceAt))
                    foundSpaceAt = foundTabAt;
                var foundColonAt = text.indexOf(":",foundAtAt);
                if (foundSpaceAt == -1 || (foundColonAt != -1 && foundColonAt < foundSpaceAt))
                    foundSpaceAt = foundColonAt;
                if (foundAtAt == text.length - 1 || foundSpaceAt == foundAtAt + 1 || foundHashAt == foundAtAt + 1 || text.charAt(foundAtAt + 1) == '@'){
                    result += "@";
                    indexAt = foundAtAt + 1;
                }
                else if (foundSpaceAt == -1 && foundHashAt == -1){
                    var linkText = text.substring(foundAtAt);
                    var userName = linkText.substring(1);
                    result += "<a href='https://twitter.com/" + encodeURIComponent(userName) + "'>" + linkText + "</a>";
                    break;
                }
                else if (foundSpaceAt != -1 && (foundSpaceAt < foundHashAt || foundHashAt == -1)){
                    var linkText = text.substring(foundAtAt,foundSpaceAt);
                    var userName = linkText.substring(1);
                    result += "<a href='https://twitter.com/" + encodeURIComponent(userName) + "'>" + linkText + "</a>";
                    indexAt = foundSpaceAt;
                }
                else{
                    var linkText = text.substring(foundAtAt,foundHashAt);
                    var userName = linkText.substring(1);
                    result += "<a href='https://twitter.com/" + encodeURIComponent(userName) + "'>" + linkText + "</a>";
                    indexAt = foundHashAt;
                }
            }
            else{
                result += text.substring(indexAt,foundHashAt);
                var foundSpaceAt = text.indexOf(" ",foundHashAt);
                var foundLineBreakAt = text.indexOf("\n",foundHashAt);
                if (foundSpaceAt == -1 || (foundLineBreakAt != -1 && foundLineBreakAt < foundSpaceAt))
                    foundSpaceAt = foundLineBreakAt;
                var foundTabAt = text.indexOf("\t",foundHashAt);
                if (foundSpaceAt == -1 || (foundTabAt != -1 && foundTabAt < foundSpaceAt))
                    foundSpaceAt = foundTabAt;
                var foundColonAt = text.indexOf(":",foundHashAt);
                if (foundSpaceAt == -1 || (foundColonAt != -1 && foundColonAt < foundSpaceAt))
                    foundSpaceAt = foundColonAt;
                if (foundHashAt == text.length - 1 || foundSpaceAt == foundHashAt + 1 || foundAtAt == foundHashAt + 1 || text.charAt(foundHashAt + 1) == '#'){
                    result += "#";
                    indexAt = foundHashAt + 1;
                }
                else if (foundSpaceAt == -1 && foundAtAt == -1){
                    var linkText = text.substring(foundHashAt);
                    result += "<a href='https://twitter.com/search/" + encodeURIComponent(linkText) + "'>" + linkText + "</a>";
                    break;
                }
                else if (foundSpaceAt != -1 && (foundSpaceAt < foundAtAt || foundAtAt == -1)){
                    var linkText = text.substring(foundHashAt,foundSpaceAt);
                    result += "<a href='https://twitter.com/search/" + encodeURIComponent(linkText) + "'>" + linkText + "</a>";
                    indexAt = foundSpaceAt;
                }
                else{
                    var linkText = text.substring(foundHashAt,foundAtAt);
                    result += "<a href='https://twitter.com/search/" + encodeURIComponent(linkText) + "'>" + linkText + "</a>";
                    indexAt = foundAtAt;
                }
            }
        }
        return result;

    }