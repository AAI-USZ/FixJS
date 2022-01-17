function update_clock(){

    var kello = $("#kello");

    var Digital = new Date();

    var hours = Digital.getHours();

    var minutes = Digital.getMinutes();

    if(minutes < 10){

        minutes = "0" + minutes;

    }

    if(hours < 10){

        hours = "0" + hours;

    }

    kello.html(hours + ":" + minutes);

    window.setTimeout(function(){

        update_clock();

    },1000);

}