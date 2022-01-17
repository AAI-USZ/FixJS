function(){
  
  if(window.navigator.standalone){
    $('#wrapper').addClass('webapp');
  }
  
  if(!pe.mobile){
  $('#wrapper').addClass('start').append('<img src="images/iphone.png" id="iphone"><a href="#" onclick="pe.checkStyle();return false;" id="check-style-button">Check the style</a>');
  $('#wrapper').append('<div id="pc"><img src="images/logo.png" id="pc-logo"><p id="pc-text">CSS PhotoEditor is a test site for new features that will be installed in iOS6.<span>The browsers supported this site are Chrome19, Safari6 & iOS6.</span></p><a href="#" onclick="alert(\'show video\');" id="video"><img src="images/video.png"><span>DEMO on iOS simulator</span></a><ul id="features"><li class="upload">Input type=file</li><li class="filter">CSS Filters</li><li class="slider">Custom Slider UI</li><li class="font">Ligature Symbols</li></ul><div class="profile"><a href="http://d.hatena.ne.jp/kudakurage/"><img src="images/profile.png" class="profile-image"></a><p class="profile-name">Kazuyuki Motoyama<span>Kudakurage</span></p><p class="profile-acount"><a href="https://twitter.com/kudakurage" class="twitter">twitter</a><a href="http://dribbble.com/kudakurage" class="dribbble">dribbble</a><a href="https://github.com/kudakurage" class="github">github</a></p><p class="profile-text">I have been working as a Web designer in Kyoto.<br />UI Design / App Design / Illustration / HTML5&CSS3 / Javascript / PHP</p><p class="copyright">Copyright &copy; 2012 kazuyuki motoyama</p></div></div>');
    pe.startViewWrapper = setTimeout(function(){
      $('#wrapper').removeClass('start');
    }, 600);
  }
  
  $('#footer a').click(function(){
    pe.sliderReset(this);
    pe.menuSelected(this);
    return false;
  });
  
  $('#footer').scroll(function(){
    pe.sliderBlur();
    pe.footerScroll = $(this).scrollLeft();
  });
  
  $('#slider input[type="range"]').change(function(){
    var filterName = $(this).attr('name');
    var filterValue = $(this).attr('value');
    pe.filterValueArray[filterName] = filterValue;
    $('#'+filterName+'-slider output span').text(filterValue);
    pe.setFilter();
  });
  
  $('#refresh').click(function(){
    pe.sliderBlur();
    pe.resetFilter();
    return false;
  });
  
  $('#info').click(function(){
    pe.sliderBlur();
    $('#display').addClass('flip');
    return false;
  });
  
  $('#back').click(function(){
    $('#display').removeClass('flip');
    return false;
  });
  
  $('#photo').click(function(){
    pe.sliderBlur();
    return false;
  });
  
  $('input[type=file]').click(function(){
    pe.sliderBlur();
  });
  $('input[type=file]').change(function() {
    if(pe.mobile){
      $('#disabled').css('display','-webkit-box');
    }else{
      $('#disabled').show();
    }
    $(this).upload('upload.php', function(res) {
      $('#disabled').hide();
      if(res.result){
        $('#photo img').attr('src', 'images/'+res.filename);
      }
    }, 'json');
  });
  
  //StartView
  pe.startView = setTimeout(function(){
    pe.menuSelected($('#saturate'));
    pe.startView1 = setTimeout(function(){
      pe.startView2 = setInterval(function(){
        var val = $('#saturate-slider input').attr('value');
        val = parseInt(val)+2;
        if(val >= 148){
          clearInterval(pe.startView2);
        }
        $('#saturate-slider input').attr('value',val);
        pe.filterValueArray['saturate'] = val;
        $('#saturate-slider output span').text(val);
        pe.setFilter();
      }, 0);
    }, 600);
  }, 1600);
}