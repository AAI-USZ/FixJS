function () {
   
  $('body').append('<div class="container-fluid">');
  $('body').append('<div class="row-fluid view">');
  
  $('body').append('<div class="span12">');
  
  $('body').append('<p><a class="btn btn-primary btn-large" href="mwt:test?say=hello">Click me to say hello.</a></p>');
  
  $('body').append('</div>');
  
  $('body').append('<div class="row-fluid">' +
                        '<div class="span6">Hello</div>' +
                        '<div class="span6">' + new Date().toUTCString() + '</div>' +
                   '</div></div>');
                   
  $('body').append('<div class="row-fluid">');
  
    var view = new View();
    $('body').append(view.toString())
  
  $('body').append('</div>');
  
  $('body').append('<div class="row-fluid">');
  
    $('body').append('<p><a class="btn btn-primary btn-large" href="mwt:showImage?url=http://rgifs.gifbin.com/1238409599_nom_nom.gif">Click me to tell Obj-C to show an image below.</a></p>');
    
  $('body').append('</div>');
  
  $('body').append('<div class="row-fluid">');
  
    $('body').append('<p><a class="btn btn-primary btn-large" href="mwt:showTableView">Show a tableview.</a></p>');
    
  $('body').append('</div>');
  
  $('body').append('</div>');
  
  var $f = new MobileFramework($('body'));
}