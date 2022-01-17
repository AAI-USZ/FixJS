function onResize(){
        codeHeight = $(window).height() - $("#header").height() - $("#Drawer").height();
        codeWidth = $(window).width();
        $("#code").height(codeHeight);
        $("#code").width(codeWidth);
        $("#List").height(codeHeight - 150);
        $("#List").width(codeWidth - 150);
}