function(event) {
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
    
    setProperty(iframe, {},{'h':new_h+"px",
                          'w':new_w+"px",
                          't':"50%",
                          'l':"50%",
                          'mt':"-"+i_margin_top,
                          'ml':"-"+i_margin_left,
                          'p':"fixed",
                          'z':"10005",})

    var small_exit_button = createElement("img");
    new_w = new_w -250;
    var i_margin_top  = parseInt(new_h)*0.5-7 + "px";
    var i_margin_left  = parseInt(new_w)*0.5-25 + "px";

    setProperty(small_exit_button, {'s':'https://github.com/Kurmaev/cv/raw/gh-pages/x.png',
                                    'c':'small_exit_button',
                                    'cl':close_iframe_event,}, 
                                    {'t':"50%",
                                    'l':"50%",
                                    'mt':"-"+i_margin_top,
                                    'ml':i_margin_left,
                                    'p':"fixed",
                                    'z':"10006",});


    var div = createLayer();
    setProperty(div, {'i':'lock_another_img'},
                     {'b':"transparent",
                      'z':"10003",
                      'o':'0.2',});

    appendChild(div);
    appendChild(small_exit_button);
    this.style.display = "none";
}