function saveConfig(e){

    e.preventDefault();
    e.stopPropagation();


    var url = location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";

    if(location.hostname == "localhost"){
        url += "simpleMVC/"
    }

    var object = url +"admin/index.php?url=admin/configurationsave";

    var ajax = ajaxOpen();

    function processResponse()
    {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                var obj = eval('(' + ajax.responseText + ')');
                $('.systemMessage').html("<div class='message'>"+obj.messages+"</div>");
                $('.message').delay(2000).slideUp('slow').delay(3000, function(){
                    location.reload();
                });
            }
        }
    }

    ajax.onreadystatechange =processResponse;

    var date = document.getElementById('date').value;
    var zone = document.getElementById('zone').value;
    var time = document.getElementById('time').value;
    var template = document.getElementById('template').value;
    var params = "date="+date+"&zone="+zone.replace("+",encodeURIComponent('+'))+"&time="+time+"&template="+template;

    ajax.open("POST", object, true);

    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajax.send(params);
}