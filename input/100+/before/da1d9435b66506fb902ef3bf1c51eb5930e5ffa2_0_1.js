function publicator_reload_publicator()
{
  var options = $('#dialog_publicator form[name="current_datas"]').serializeArray();

  var opts = {
    type : 'POST',
    url : "/prod/bridge/manager/",
    dataType : 'html',
    data : options,
    beforeSend : function(){
      $('#dialog_publicator').empty().addClass("loading");
    },
    success : function(data){
      publicator_load_datas(data);
    },
    error:function(){
      $('#dialog_publicator').removeClass("loading");
    },
    timeout:function(){
      $('#dialog_publicator').removeClass("loading");
    }
  }
  $.ajax(opts);
}