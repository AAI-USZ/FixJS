function (editor, event) {
        var ret = this._handle_codemirror_keyevent(editor, event);
        if (ret != null){
          return ret;
        }
        return false;
    }