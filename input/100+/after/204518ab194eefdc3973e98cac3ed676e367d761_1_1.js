f}else{if(typeof f==="object"||!f){return e.bind.apply(this,arguments);}else{a.error("Method "+f+" does not exist on jQuery.mapster");
}}};a.mapster={version:"1.2.6.004",render_defaults:{isSelectable:true,isDeselectable:true,fade:false,fadeDuration:150,altImage:null,fill:true,fillColor:"000000",fillColorMask:"FFFFFF",fillOpacity:0.7,highlight:null,stroke:false,strokeColor:"ff0000",strokeOpacity:1,strokeWidth:1,includeKeys:"",altImageId:null,altImages:{}},defaults:{clickNavigate:false,wrapClass:null,wrapCss:null,onGetList:null,sortList:false,listenToList:false,mapKey:"",mapValue:"",singleSelect:false,listKey:"value",listSelectedAttribute:"selected",listSelectedClass:null,onClick:null,onMouseover:null,onMouseout:null,mouseoutDelay:0,onStateChange:null,boundList:null,onConfigured:null,configTimeout:30000,noHrefIsMask:true,scaleMap:true,safeLoad:false,areas:[]},shared_defaults:{render_highlight:{fade:true},render_select:{fade:false},staticState:null,selected:null},area_defaults:{includeKeys:"",isMask:false},canvas_style:{position:"absolute",left:0,top:0,padding:0,border:0},hasCanvas:null,isTouch:null,windowLoaded:false,map_cache:[],hooks:{},addHook:function(f,e){this.hooks[f]=(this.hooks[f]||[]).push(e);