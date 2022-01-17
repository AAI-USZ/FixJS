function checkForHint(editor) {
//        var pos = editor._codeMirror.getCursor();
//        var tagInfo = HTMLUtils.getTagInfo(editor, pos);
//        if (tagInfo.position.tokenType === HTMLUtils.ATTR_VALUE) {
//            if (tagInfo.attr.name === "class") {
//                _triggerClassHint(editor, pos, tagInfo);
//            } else if (tagInfo.attr.name === "id") {
//                _triggerIdHint(editor, pos, tagInfo);
//            }
//        } else if (tagInfo.position.tokenType === HTMLUtils.TAG_NAME) {
//            console.log(_getCodeHints(HTMLTags, tagInfo.tagName));
//        }

        $("#codehint-text")
            .focus();
    }