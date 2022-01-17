function(){
  for(key in pe.filterInitArray){
    $('#'+key+'-slider input').attr('value',pe.filterInitArray[key]);
    $('#'+key+'-slider output span').text(pe.filterInitArray[key]);
    pe.filterValueArray[key] = pe.filterInitArray[key];
  }
  $('#photo img').addClass('animate');
  pe.setFilter();
  var t = setTimeout(function(){
    $('#photo img').removeClass('animate');
  }, 1000);
}