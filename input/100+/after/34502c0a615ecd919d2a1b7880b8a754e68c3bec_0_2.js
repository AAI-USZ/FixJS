function(){
    //Update list element
    c_list.page = c_pagenate.current_page;
    list_request.url = DcmgrGUI.Util.getPagePath('/keypairs/list/', c_list.page);
    list_request.data = DcmgrGUI.Util.getPagenateData(c_pagenate.start,c_pagenate.row);
    c_list.element.trigger('dcmgrGUI.updateList', {request:list_request})

    var check_id = c_list.currentChecked();
    //remove detail element
    $($('#detail').find('#'+check_id)).remove();
  }