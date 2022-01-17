function () {
            tinyMCE.execCommand("mceRemoveControl", false, textareaId);
            if (checkbox.checked) {
                tinyMCE.execCommand("mceAddControl", false, textareaId);
            }
        }