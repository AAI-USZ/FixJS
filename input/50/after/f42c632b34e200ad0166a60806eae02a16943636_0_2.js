function () {
            if (checkbox.checked) {
                tinyMCE.execCommand("mceAddControl", false, textareaId);
            } else {
                tinyMCE.execCommand("mceRemoveControl", false, textareaId);
            }
        }