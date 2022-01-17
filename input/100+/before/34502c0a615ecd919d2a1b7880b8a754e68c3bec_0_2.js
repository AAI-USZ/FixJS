function(){
    //Update list element
    c_list.page = c_pagenate.current_page;
    list_request.url = DcmgrGUI.Util.getPagePath('/keypairs/list/', c_list.page);
    list_request.data = DcmgrGUI.Util.getPagenateData(c_pagenate.start,c_pagenate.row);
    c_list.element.trigger('dcmgrGUI.updateList', {request:list_request})
    
    $.each(c_list.checked_list, function(check_id,obj){
      //All remove detail element
      $($('#detail').find('#'+check_id)).remove();
      
      //All reload detail element
      c_list.checked_list[check_id].c_detail.update({
        url:DcmgrGUI.Util.getPagePath('/keypairs/show/', check_id)
      },true);
    });
  }