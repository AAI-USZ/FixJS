function(){
         var destinationdiv=$('#columnlist_'+this.id);
         destinationdiv.parents("td:first").toggle();
         if(destinationdiv.parents("td:first").css("display") != "none") {
             $.post(listColumnUrl+'/'+this.id+'/sql/'+sql, function(data) {
                 destinationdiv.html(data);
             });
         }

     }