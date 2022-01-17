function addCategory(e){
    e.preventDefault();
    e.stopPropagation();

    var url = location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";

    if(location.hostname == "localhost"){
        url += "simpleMVC/"
     }

    var ajax = ajaxOpen();
    var object = url+"index.php?url=category/add";


    function processResponse()
    {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {

                var obj = eval('(' + ajax.responseText + ')');
                $('.systemMessage').html("<div class='message'>"+obj.messages+"</div>");
                $('.message').delay(2000).slideUp('slow');

                var table = document.getElementById("categorys");
                var lenght = table.rows.length;

                var row = table.insertRow(lenght);

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);

                cell1.innerHTML = obj.catName;
                cell2.innerHTML = obj.catDescription;
                cell3.innerHTML = "<a href='"+url+"index.php?url=category/edit&cat_id="+obj.catId+"'>Edytuj</a>";
                cell4.innerHTML = "<a class='remove-category' href='"+url+"index.php?url=category/remove&cat_id="+obj.catId+"'>Usuń</a>";

                categories();
            }
        }
    }

    ajax.onreadystatechange =processResponse;

    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var params = "name="+name+"&description="+description;

    ajax.open("POST", object, true);

    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajax.send(params);
}