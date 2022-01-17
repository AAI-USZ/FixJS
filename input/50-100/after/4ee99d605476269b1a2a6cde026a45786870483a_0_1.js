function (i, elem) {
            switch (elem.nodeName.toLowerCase()) {
                case 'label':
                    alert(elem.nodeName.toLowerCase());
                    break;
                case "shouldarchive":
                case "shouldstar":
                case "shouldneverspam":
                case "shouldalwaysmarkasimportant":
                case "shouldtrash":
                    alert(elem.nodeName.toLowerCase());
                    break;
                default:
                    extension += elem.nodeName.toLowerCase() + ":(" + $(elem).html() + ")";
            }
        }