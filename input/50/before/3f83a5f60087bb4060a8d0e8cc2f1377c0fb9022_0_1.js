function (editor, event) {
        var ret = this._handle_code_mirror_keyevent(editor, event);
        if (ret != null){
          return ret;
        }
        return false;
    }