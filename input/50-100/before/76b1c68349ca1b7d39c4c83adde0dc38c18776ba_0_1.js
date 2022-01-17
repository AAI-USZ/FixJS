function onResize(){
        codeHeight = window.innerHeight - $("#header").height() - $("#Drawer").height();
        codeWidth = window.innerWidth;
        $("#code").height(codeHeight);
        $("#code").width(codeWidth);
        $("#List").height(codeHeight - 150);
        $("#List").width(codeWidth - 150);
}