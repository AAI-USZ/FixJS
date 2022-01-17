function _checkForHint(editor) {
//        var pos = editor._codeMirror.getCursor();
//        var tagInfo = HTMLUtils.getTagInfo(editor, pos);
//        if (tagInfo.position.tokenType === HTMLUtils.ATTR_VALUE) {
//            if (tagInfo.attr.name === "class") {
//                _triggerClassHint(editor, pos, tagInfo);
//            } else if (tagInfo.attr.name === "id") {
//                _triggerIdHint(editor, pos, tagInfo);
//            }
//        } else if (tagInfo.position.tokenType === HTMLUtils.TAG_NAME) {
//            $("#codehint-text")
//                .focus()
//                .html(tagInfo.tagName)
//                .smartAutoComplete({
//                    maxResults: 20,
//                    minCharLimit: 0,
//                    autocompleteFocused: true,
//                    forceSelect: false,
//                    typeAhead: false,
//                    filter: _handleFilter,
//                    //resultFormatter: _handleResultsFormatter
//                });
//            return false;
//         }

        $("#codehint-text")
            .focus();
    }