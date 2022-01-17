function(data){
     
     for (var p = 0; p <= data.length; p++){
       if (data[p]) {
        var counter = 1;
        counter += p;
        var id = data[p].name.replace(/\[\]/, '');
        id = (id.indexOf('title') !== -1) ? id + counter : id;
        console.log(id);
        }
     }

}