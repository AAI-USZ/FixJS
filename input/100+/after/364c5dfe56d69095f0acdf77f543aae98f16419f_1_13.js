fif(!e){g=1;e=f;}else{g=f.width/e.width||f.height/e.height;if(g>0.98&&g<1.02){g=1;
}}return{scale:(g!==1),scalePct:g,realWidth:e.width,realHeight:e.height,width:f.width,height:f.height,ratio:f.width/f.height};
};b.utils.scaleMap=function(e,f,h){var i=d.size(e),g=d.size(f,true);if(!g.complete){throw ("Another script, such as an extension, appears to be interfering with image loading. Please let us know about this.");
