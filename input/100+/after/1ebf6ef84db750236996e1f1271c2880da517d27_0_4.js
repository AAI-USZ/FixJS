function(root){
    var TRACE_UI = false;
    var TRACE_LAYERS = true;
    var gridLayer = new Image();
    var objectLayer = new Image();
    function refreshGridLayer(forceLowerLevel){//{{{
        if(TRACE_LAYERS)console.log("Grid Layer: "+forceLowerLevel)
        // redraw all the objects on the canvas
        with(draft.context){
            with(draft.canvas){
                var grad = createLinearGradient(0,0,0,height);
                grad.addColorStop(0,'rgb(0,0,200)');
                grad.addColorStop(1,'rgb(0,0,100)');
                fillStyle=grad;
                fillRect(0,0,width,height);
                lineCap = 'round';         

                if(draft.gridOptions["lines"]){//{{{
                    drawGrid = function (spacing){
                        beginPath();
                        for(var i=0; i< width; i+= spacing)
                        {
                            moveTo(i,0);
                            lineTo(i,height);
                        }
                        for(var i=0; i< height; i+= spacing)
                        {
                            moveTo(0,i);
                            lineTo(width,i);
                        }
                        stroke();
                    };
    
                    lineWidth=1;
                    strokeStyle = "rgb(100,100,100)";
                    drawGrid(40);
                    
                    lineWidth=2;
                    strokeStyle = "rgb(200,200,200)";
                    drawGrid(200);
                }//}}}

                if(draft.gridOptions["points"]){//{{{
                    lineWidth=2;
                    strokeStyle = "rgb(200,200,200)";
                    var spacing = 40;
                    var spacing2=200;
                    lineWidth = 2;
                    for(var x=0; x< width;  x+=spacing)
                    for(var y=0; y< height; y+=spacing)
                    {
                        beginPath();
                        if((x%spacing2==0) && (y%spacing2==0))
                            lineWidth= 7;
                        
                        moveTo(x-.5,y);
                        lineTo(x+.5,y);
                        stroke();
                        if((x%spacing2==0) && (y%spacing2==0))
                            lineWidth= 2;
                    }
                }//}}}
            }
            gridLayer.src=canvas.toDataURL("image/png");
        }
    }//}}}

    function refreshObjectLayer(forceLowerLevel){//{{{
        if(TRACE_LAYERS)console.log("Object Layer: "+forceLowerLevel)
        if(forceLowerLevel)
            refreshGridLayer();


        with(draft.context){
            drawImage(gridLayer,0,0);
            
            strokeStyle = "rgb(255,255,255)";
            lineWidth   = 5;
            beginPath() 
            //Draw Objects {{{ 
            //Draw circles first, they might eventually fill with colors?
            draft.objects.circles.forEach(function(c,idx,array){
                var p1 = draft.objects.points[c.p1];
                var p2 = draft.objects.points[c.p2];
                var r = dist(p1,p2);
                arc(p1.x,p1.y,r,0,Math.PI*2,true);
            });

            //Lines 2nd        
            draft.objects.lines.forEach(function(ln,idx,array){
                p1 = draft.objects.points[ln.p1];
                p2 = draft.objects.points[ln.p2];
                moveTo(p1.x,p1.y);
                lineTo(p2.x,p2.y);
            });
            stroke();

            //Draw Points last, so that they are on top of everything.
            beginPath() 
            lineWidth = 10;
            strokeStyle = "rgb(128,128,255)";
            draft.objects.points.forEach(function(pt,idx,array){
                moveTo(pt.x-.5,pt.y);
                lineTo(pt.x+.5,pt.y);
            });
            stroke();
            //}}}
        //    objectLayer.src = canvas.toDataURL("image/png");
        }
        
    }//}}}

    function refreshToolLayer(forceLowerLevel){
        if(TRACE_LAYERS)console.log("Tool Layer: "+forceLowerLevel)
        forceLowerLevel=true
        if(forceLowerLevel) 
            refreshObjectLayer(false);

        if(!draft.activeTool)return;
//        draft.context.drawImage(objectLayer,0,0);
    
        var selected = draft.activeTool.selected;

        with(draft.context){//{{{
                beginPath();

                strokeStyle="rgb(64,128,64)";
                lineWidth   = 5;
                if(selected.circles)
                selected.circles.forEach(function(c,idx,array){
                    c = draft.objects.circles[c];
                    if(c==null) return;
                    var p1 = draft.objects.points[c.p1];
                    var p2 = draft.objects.points[c.p2];
                    var r = dist(p1,p2);
                    arc(p1.x,p1.y,r,0,Math.PI*2,true);
                });

                //Lines 2nd        
                if(selected.lines)
                selected.lines.forEach(function(ln,idx,array){
                    ln = draft.objects.lines[ln];
                    if(ln==null) return;
                    var p1 = draft.objects.points[ln.p1];
                    var p2 = draft.objects.points[ln.p2];
                    if(p1==null || p2==null) return;
                    moveTo(p1.x,p1.y);
                    lineTo(p2.x,p2.y);
                    stroke();
                });

                //Draw Points last, so that they are on top of everything.
                lineWidth = 10;
                defaultStyle = "rgb(128,128,255)";
                if(selected.points)
                selected.points.forEach(function(pt,idx,array){ 
                    pt = draft.objects.points[pt];
                    if(pt==null) return;
                    moveTo(pt.x-.5,pt.y);
                    lineTo(pt.x+.5,pt.y);
                });
                stroke();
                //}}}
     
        }
        if(draft.activeTool.draw)
            draft.activeTool.draw(draft.context);
    }


    //{{{ UI events
    function down(e){
        if(TRACE_UI)console.log("down");
        draft.down = true;

        if(draft.activeTool==null)return;
        if(draft.activeTool.down==null) return;
        setXY(e);
        if(draft.activeTool.down(e))
            refreshToolLayer();
    }

    function up(e){
        if(TRACE_UI)console.log("up");
        draft.down = false;

        if(draft.activeTool==null)return;
        if(draft.activeTool.up==null) return;
        setXY(e);
        if(draft.activeTool.up(e))
            refreshToolLayer();
    }
    
    function move(e){
        if(draft.activeTool==null)return;
        setXY(e);
        if(draft.down)
            drag(e);
        else 
            if(draft.activeTool.move)
                if(draft.activeTool.move(e))
                    refreshToolLayer();
    }

    function drag(e){
        if(TRACE_UI)console.log("drag");
        if(draft.activeTool.drag==null) return;
        if(draft.activeTool.drag(e))
            refreshToolLayer(); 
    }
    //}}} End UI events.

    function connect(){//{{{
        sock = new SockJS('http://'+document.domain+':'+location.port+'/sjs');
        sock.onopen = function() {
            console.log('connected');
            draft.pushInterval = setInterval(
                function (){
                    if(draft.message)
                        sock.send(JSON.stringify(draft.message));
                    draft.message = null;
                }
            , 10);
            refreshGridLayer();
        };
        sock.onmessage = function(msg) {
            var data = JSON.parse(msg.data);
            if (data.type == 'serverInfo'){
                console.log("Server info: "+data.startTime+" "+draft.loadTime);
                if (draft.loadTime < data.startTime)
                    location.reload(true);
            }
            if (data.type == 'sync'){
                draft.objects = data.objects;
                var usercount = document.getElementById('users');
//                usercount.innerHTML= data.usercount;
                refreshObjectLayer(); 
                
            }
            if (data.type == 'stats'){
//                console.log(data)
            }
            
        };
        sock.onclose = function() {
            console.log('disconnected');
            setTimeout(function(){try{connect();}catch(e){}},1000);
            clearInterval(draft.pushInterval);
        };
        draft.sendMessage = function(msg){
            console.log("Out:")
            console.log(msg)
            sock.send(JSON.stringify(msg));
        }
    }//}}}

    function init(){//{{{

        // Setup Canvas
        draft.canvas = document.getElementsByTagName('canvas')[0];
        draft.context = draft.canvas.getContext('2d');
        with(draft.context){
            canvas.style.position = 'fixed';
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            window.onresize = function(){
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                refreshObjectLayer(true);
            }
            canvas.addEventListener('mousedown', down,false);
            canvas.addEventListener('touchstart', down,false);
            canvas.addEventListener('touchend', up,false);
            canvas.addEventListener('mouseup', up,false);
            canvas.addEventListener('mousemove', move,false);
            canvas.addEventListener('touchmove', move,false);
            canvas.addEventListener('contextmenu', function(e){
                if (e.button === 2){
                    e.preventDefault();
                    return false;
                }
            },false);
        }

        // set up document
        with(document){
            $('.tool').click(function(e){
                if(!$(this).is('.selected')){
                    console.log("unset active tool");
                    draft.activeTool=null;
                    return;
                }
                var id = e.target.id;
                console.log("set active tool :"+id);
                draft.activeTool=Tool(id);
            });
            $('.gridoption').click(function(e){
                var selected = $(this).is('.selected');
                var id = e.target.id;
                draft.gridOptions[id]=selected;

                refreshObjectLayer(true);
            });
        }


        // hide address bar for Android
        if (window.navigator.userAgent.match('/Android/i')){
            setTimeout(function(){
                canvas.height = window.innerHeight + 60;
                window.scrollTo(0,1);
            }, 0);
        }

        setupTools();
        // connect to server
        connect();
    }//}}}
   

    //set up namespace
    var draft = typeof exports != 'undefined' ? exports : root.draft = {}
    draft.tools = {};
    draft.activeTool = null;//null or the tools name/key 
    draft.x = 0;      //position of the current event relative to the canvas.
    draft.y = 0;
    draft.down=false; //mouse pressed
    draft.objects={}; 
    draft.init = init; //actual declaration is after the init function.
    draft.gridOptions={
        "lines":false,
        "points":false,
        "snap":false
    };
    
    draft.message = null; // Message to be pushed out next time output is sent. (unreliable)
    draft.pushInterval = null;//interval handle
    draft.sendMessage = null; //Send a message (Sync)

    draft.init = init;

    draft.loadTime = (new Date()).getTime();

}