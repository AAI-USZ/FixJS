function(data){
        if (data.success === 1) {
            app.fireEvent('deleteList', list);
            app.dom.show(app.dom.get('showable', 'delete-list-twipsy'));
            app.dom.hide(app.dom.get('showable', 'delete-list-window'));
        } else {
            // 現在 ステータスコード 200 の例外ケースは無い
        }
    }