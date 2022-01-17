function addUser(e){

    e.preventDefault();
    e.stopPropagation();


    var url = location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";

    if(location.hostname == "localhost"){
        url += "homepage/"
    }

  var ajax = ajaxOpen();
  var object = url+"index.php?url=user/create";
    function processResponse()
    {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                var obj = eval('(' + ajax.responseText + ')');
                $('.systemMessage').html("<div class='message'>"+obj.messages+"</div>");
                $('.message').delay(2000).slideUp('slow');

                var table = document.getElementById("users");
                var lenght = table.rows.length;

                var row = table.insertRow(lenght);

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);

                cell1.innerHTML = obj.usrLogin;
                cell2.innerHTML = obj.usrEmail;
                cell3.innerHTML = obj.usrName;
                cell4.innerHTML = obj.usrSurname;
                cell5.innerHTML = "<a href='"+url+"index.php?url=user/edit&us_id="+obj.usrId+"'>Edytuj</a>";
                cell6.innerHTML = "<a class='remove-user' href='"+url+"index.php?url=user/remove&us_id="+obj.usrId+"'>Usuń</a>";

                users();
            }
        }
    }

    ajax.onreadystatechange =processResponse;

    var name = document.getElementById('name').value;
    var surname = document.getElementById('surname').value;
    var email = document.getElementById('email').value;
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;
    var params = "name="+name+"&surname="+surname+"&email="+email+"&login="+login+"&password="+password;
    ajax.open("POST", object, true);

    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajax.send(params);
}