function checkDataSourceScheduleTask(){
    var content = 'A background task is currently in progress for this data source. Please try reloading the screen again shortly..';
    var dataSourcekey = $('#dataSourceKey').length;
    var dsKey = $('#dataSourceKey').val();
    //console.log(dataSourcekey);
    if(dataSourcekey==1){
      //console.log(rootAppPath+"orca/manage/process_registry_object.php?task=dataSourceBackgroundStatus&data_source="+dsKey);
      $.ajax({
        type:"POST",   
        url:rootAppPath+"orca/manage/process_registry_object.php?task=dataSourceBackgroundStatus&data_source="+dsKey,   
        success:function(msg){
          
          if(msg=='1'){
            $('#dataSourceStatus').show();
            $('#dataSourceStatus').html(content);
          }else{
            $('#dataSourceStatus').hide();
          }
        }
    });
    }
  }