function(){
  if(pe.checkStyleContent){
    pe.checkStyleContent.remove();
    pe.checkStyleContent = false;
  }else{
    pe.checkStyleContent = $('<div/>').attr('id','check-style-content').html('<h2>-webkit-filter:</h2><p>saturate(<span>'+ pe.filterValueArray["saturate"] +'%</span>)</p><p>brightness(<span>'+ pe.filterValueArray["brightness"] +'%</span>)</p><p>contrast(<span>'+ pe.filterValueArray["contrast"] +'%</span>)</p><p>hue-rotate(<span>'+ pe.filterValueArray["huerotate"] +'deg</span>)</p><p>invert(<span>'+ pe.filterValueArray["invert"] +'%</span>)</p><p>blur(<span>'+ pe.filterValueArray["blur"] +'px</span>)</p><p>sepia(<span>'+ pe.filterValueArray["sepia"] +'%</span>)</p><p>grayscale(<span>'+ pe.filterValueArray["grayscale"] +'%</span>)</p><p>opacity(<span>'+ pe.filterValueArray["opacity"] +'%</span>)</p>');
    pe.checkStyleContent.click(function(){
      pe.checkStyle();
    });
    $('#wrapper').append(pe.checkStyleContent);
  }
  return false;
}