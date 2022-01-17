function loadDragDropRank(qID){
  $('#question'+qID+' .select-item select').each(function(){
    if($(this).val()!=''){
        $('#sortable-choice-'+qID+' li#choice_'+$(this).val()).appendTo('#sortable-rank-'+qID);
    }
  });
  $('#sortable-rank-'+qID+' li').removeClass("error");
  $('#sortable-choice-'+qID+' li').removeClass("error");
  $('#sortable-rank-'+qID+' li:gt('+(maxanswers*1-1)+')').addClass("error");
}