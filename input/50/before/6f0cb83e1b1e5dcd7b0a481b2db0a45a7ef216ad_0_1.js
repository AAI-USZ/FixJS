function(){
  $('#sample input[name=search]').click(search);
  $('#sample input[name=word]').keydown(function(e){
    if(e.keyCode === 13) search();
  });
}