function(){

var path_to_index = 'http://kurmaev.github.com/cv/';

var domain = document.domain;
console.dir(domain);
var buildAddress = function(arg){
  var url;
  url = encodeURIComponent(arg[0].src);
  return path_to_index + '#u=' + url + "&h=" + arg[1] + "&w=" + arg[2]+ "&nh=" + arg[5] + "&nw=" + arg[6]+"&d="+domain;
};

var num_iframe = 0;
var save_pos;
var padding  = 30;

function bind(target, fn) {
  fn = typeof fn === 'function' 
    ? fn
    : (target[fn] || function() {});
  return function() {
    return fn.apply(target, arguments);
  };
};


var appendChild = bind(document.body, 'appendChild');
var removeChild = bind(document.body, 'removeChild');
var createElement = bind(document, 'createElement');
var getByClass = bind(document, 'getElementsByClassName');
var to_arr = bind(Array.prototype.slice, 'call');

function $(id) {return document.getElementById(id);};

var setProperty = function (){
  var it = arguments[0];
  var args = arguments[1];
  var style_args = arguments[2];
  var dict = {h:'height',
              w:'width',
              t:'top',
              l:'left',
              pd:'padding',
              z:'zIndex',
              p:'position',
              mt:'marginTop',
              ml:'marginLeft',
              b:'backgroundColor',
              c:'color',
              br:'border',
              ta:'textAlign',
              f:'fontSize',
              o:'opacity',};
  var dict2 = {s:'src',
              c:'className',
              i:'id',
              ih:'innerHTML',
              cl:'onclick',};

  for(var prop in style_args) {
    it.style[dict[prop]] = style_args[prop];
  };

  for(var prop2 in args) {
    it[dict2[prop2]] = args[prop2];
  };

};


var createLayer = function() { 
  var height = document.body.scrollHeight;
  var div = createElement('div');
  setProperty(div, {}, {'p':'absolute',
                        'w':"100%",
                        'h':height+"px",
                        't':"0px",
                        'l':'0px'});
  return div
};


var div_click_event = function(event) {
    var id = this.className.split(" ")[0];
    var iframe = $(id);

    var parts=String(iframe.src).split("#",2)[1].split("&");
    var GET={};
    for (i=0; i<parts.length; i++) {
       curr = parts[i].split('=');
       GET[curr[0]] = curr[1];
    }

    save_pos = [iframe.id, iframe.style.top, iframe.style.left, iframe.style.width, iframe.style.height];

    new_w = parseInt(GET['nw']) + parseInt(padding)*2 + 250;
    new_h = parseInt(GET['nh']) + parseInt(padding)*2 + 300;
    var i_margin_top  = parseInt(new_h)*0.5 + "px";
    var i_margin_left  = parseInt(new_w - 250 )*0.5 + "px";

    var new_t = parseInt(iframe.style.top)+10
    console.dir(iframe);
    console.log(new_t);
    
    setProperty(iframe, {},{'h':new_h+"px",
                          'w':new_w+"px",
                          'l':"50%",
                          'ml':"-"+i_margin_left,
                          'p':"absolute",
                          'z':"10005",})

    var small_exit_button = createElement("img");
    new_w = new_w -250;
    var i_margin_top  = parseInt(new_h)*0.5-7 + "px";
    var i_margin_left  = parseInt(new_w)*0.5-25 + "px";


    setProperty(small_exit_button, {'s':'https://github.com/Kurmaev/cv/raw/gh-pages/x.png',
                                    'c':'small_exit_button',
                                    'cl':close_iframe_event,}, 
                                    {'t': new_t + 'px',
                                    'l':"50%",
                                    'ml':i_margin_left,
                                    'p':"absolute",
                                    'z':"10006",});


    var div = createLayer();
    setProperty(div, {'i':'lock_another_img'},
                     {'b':"transparent",
                      'z':"10003",
                      'o':'0.2',});

    appendChild(div);
    appendChild(small_exit_button);
    this.style.display = "none";
};

var close_iframe_event = function(event) {
  
  del_many(getByClass("small_exit_button"))
  var iframe = $(save_pos[0]);

  setProperty(iframe, {},{'h':save_pos[4],
                          'w':save_pos[3],
                          't':save_pos[1],
                          'l':save_pos[2],
                          'mt':'0px',
                          'ml':'0px',
                          'p':"absolute",
                          'z':"10001",})

  removeChild($("lock_another_img"));
  getByClass(save_pos[0])[0].style.display = "block";
  return ;
}

var createBaseIframe = function(){
  var baseiframe = createElement('iframe');
  setProperty(baseiframe, {'s': path_to_index,
                            'i':'baseiframe',
                            'c':'delete_this_iframe',}, 
                          {
                            'p':'absolute',
                            'l': '-9999999px',
                          });
  appendChild(baseiframe);
};

var createIframe = function(it){

  var iframe = createElement('iframe');
  var h_iframe = parseInt(it[1])+2*parseInt(padding)+40;
  var w_iframe = parseInt(it[2])+2*parseInt(padding);

  var class_id = "my-iframe" + num_iframe;
  num_iframe = num_iframe + 1;

  setProperty(iframe, {'s':buildAddress(it),
                        'i':class_id,
                        'c':'delete_this_iframe',},
                      {'p':'absolute',
                        'w':w_iframe+"px",
                        'h':h_iframe+"px",
                        't':it[3]+"px",
                        'l':it[4]+'px',
                        'br': '0',
                        'z':'10001',});

  iframe_div = createElement('div');
  setProperty(iframe_div, {'c':class_id+" delete_this_div",
                            'cl':div_click_event},
                          {'h':h_iframe+"px",
                            'w':w_iframe+"px",
                            't':it[3]+"px",
                            'l':it[4]+"px",
                            'p':"absolute",
                            'z':"10002",})

  appendChild(iframe_div);
  return appendChild(iframe);
};

var del_many = function(arg){
  to_arr(arg).forEach(function(it){removeChild(it)})
};

var click_exit_button = function(event) {

    del_many(getByClass("delete_this_div"));
    del_many(getByClass("delete_this_iframe"));
    
    var todel = getByClass("small_exit_button");
    if (todel) {
      del_many(todel);
    };
    todel = $("lock_another_img");
    if (todel) {
      removeChild(todel);
    };
   return ;
  };

var createDiv = function(){

  var div = createLayer();
  setProperty(div, {'c':'delete_this_div'},
                  {'b':'black',
                    'z':"10000",
                    'o':'0.7'})


  var exit_button = document.createElement('div');
  setProperty(exit_button, {'c':'delete_this_div',
                            'ih':'<span style="font-size: 20px; color: black; margin:0">Cancel Note<span>',
                            'cl':click_exit_button,},
                          {'w':'100%',
                            't':'0px',
                            'l':'0px',
                            'pd':'20px 0 20px 0',
                            'p':"fixed",
                            'b':'#EEEEEE',
                            'z':"10010",
                            'ta':"center",
                            'f':"20px",
                            'c':"black",})


  appendChild(div);
  appendChild(exit_button);

  return;

};

createBaseIframe();
createDiv();

var ArrayToIframe = function(array) {

  to_arr(array).filter(function(it){
  return it.clientHeight > 100 && it.clientWidth > 300;
}).map(function(it){
  return [(it)].concat([it['height'], it['width'], it['y'], it['x']], it['naturalHeight'], it['naturalWidth']);
}).forEach(function(it){
  return createIframe(it);
});

};

ArrayToIframe(document.getElementsByTagName('img'));
/*
to_arr(document.getElementsByTagName('iframe')).forEach(function(it){
  if (it.contentDocument){
    ArrayToIframe(it.contentDocument.getElementsByTagName('img'));
  }
})
*/
}