function(){
        pos = $('.drsElement').length;
        console.log(pos);
        $(document.getElementById('pane'+pos)).remove();
        $(document.getElementById('min_win'+pos)).remove();
        POS[pos]=0;

    }