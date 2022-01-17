function(){
  for(key in pe.filterInitArray){
    $('#'+key+'-slider input').attr('value',pe.filterInitArray[key]);
    $('#'+key+'-slider output span').text(pe.filterInitArray[key]);
    pe.filterValueArray[key] = pe.filterInitArray[key];
  }
  pe.setFilter();
}