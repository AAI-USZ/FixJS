function(){

        var turn = new Turn;
        // 初始化
        turn.initialize();

        // 计算位置
        turn.setPosition();

        // 窗口尺寸改变时重新计算位置
        $(window).resize(function(){
            turn.delaySetPosition();
        });

    }