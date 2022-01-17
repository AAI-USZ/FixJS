function (i, elem) {
            switch (elem.nodeName.toLowerCase()) {
                case 'label':
                    //alert(elem.nodeName.toLowerCase());
                    break;
                case "shouldarchive":
                case "shouldstar":
                case "shouldneverspam":
                case "shouldalwaysmarkasimportant":
                case "shouldtrash":
                    //alert(elem.nodeName.toLowerCase());
                    break;
                case 'hastheword':
                case 'doesnothavetheword':
                    extension += " " + encodeURI($(elem).html()) + "";
                    break
                default:
                    extension += elem.nodeName.toLowerCase() + ":(" + encodeURI($(elem).html().replace(/ /g,"+")).replace("?","%3F") + ") ";
            }
        }