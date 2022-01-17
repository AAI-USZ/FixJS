function(event,params){
    var load_balancer = params.data.load_balancer;
    c_pagenate.changeTotal(load_balancer.total);
    c_list.setData(load_balancer.results);
    c_list.multiCheckList(c_list.detail_template);
    c_list.element.find(".edit_load_balancer").each(function(key,value){
      $(this).button({ disabled: false });
      var uuid = $(value).attr('id').replace(/edit_(vol-[a-z0-9]+)/,'$1');
      if( uuid ){
        $(this).bind('click',function(){
          bt_edit_load_balancer.open({"ids":[uuid]});
        });
      } else {
        $(this).button({ disabled: true });
      }
    });
  }