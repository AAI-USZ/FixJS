function loadDragDropRank(qID){
  $('#question'+qID+' .select-item select').each(function(){
    if($(this).val()!=''){
        $('#sortable-choice-'+qID+' li#choice_'+$(this).val()).appendTo('#sortable-rank-'+qID);
    }
  });
}