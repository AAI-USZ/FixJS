function(){
  var _selectedClassName = "lesskel_selected";
  var selected_elem;
  
  function inspect(e){
      if(selected_elem && selected_elem === e.target){
        $(selected_elem).removeClass(_selectedClassName);
      }else{
        $(selected_elem).removeClass(_selectedClassName);
        selected_elem = e.target;
        $(e.target).addClass(_selectedClassName);
      }
  };
  
  $(document).mouseover(inspect);
  
  $(document).click(function(e){
    $(selected_elem).removeClass(_selectedClassName);
    var src = $.lesskel(selected_elem);
    alert(src);
    
    $(document).unbind("click");
    $(document).unbind("mouseover" , inspect);
  });
}