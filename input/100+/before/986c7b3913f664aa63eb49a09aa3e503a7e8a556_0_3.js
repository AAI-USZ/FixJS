function updateDragDropRank(qID){
  $('#question'+qID+' .select-item select').val('');
  $('#sortable-rank-'+qID+' li').each(function(index) {
    // Get value of ranked item
    var liID = $(this).attr("id");
    liIDArray = liID.split('_');
    $('#question'+qID+' .select-item select').eq(index).val(liIDArray[1]);
  });
  $('#question'+qID+' .select-item select').each(function(){
    checkconditions($(this).val(),$(this).attr("name"),'select-one','onchange');
  });
}