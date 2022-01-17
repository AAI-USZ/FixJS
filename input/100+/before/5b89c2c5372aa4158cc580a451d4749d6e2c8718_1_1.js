function closeToFragment(stopTag) {
        // Note: we're not exceeding collapsable section boundries
        var element = holder;
        var _fragment = fragment;
        stopTag = stopTag ? stopTag.toLowerCase() : "div";

        while (element !== _fragment) {
            var tag = element.tagName.toLowerCase();
            if (tag === stopTag) {
                holder = element;
                return;
            }
            var method = null;
            switch (tag) {
            case "p":
                method = closeParagraph;
                break;
            case "li":
            case "ul":
            case "ol":
                method = closeList;
                break;
            case "td":
            case "tr":
            case "tbody":
            case "table":
                method = closeTable;
                break;
            default:
                break;
            }
            if (method) {
                method();
                element = holder;
            } else {
                element = element.parentNode;
            }
        }

        holder = _fragment;
    }