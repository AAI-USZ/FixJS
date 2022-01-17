function(e){
            if(e.target.tagName === 'INPUT'){
                var value = e.target.value;
                var imgData = ctx.getImageData(0, 0, source.width, source.height);
                switch(value){
                    case 'discolor':
                        sketching.discolor(imgData.data);
                        ctx2.putImageData(imgData, 0, 0);
                        break;
                    case 'invert':
                        sketching.invert(imgData.data);
                        ctx2.putImageData(imgData, 0, 0);
                        break;
                    case 'gaussBlur':
                        sketching.gaussBlur(imgData.data, imgData.width, imgData.height);
                        ctx2.putImageData(imgData, 0, 0);
                        break;
                    case 'dodgeColor':
                        // dodgeColor(imgData.data, imgData2.data);
                        // ctx2.putImageData(imgData, 0, 0);
                        break;
                    case 'sketch':
                    
                        imgData2 = ctx.getImageData(0, 0, source.width, source.height);
                        // discolor(imgData.data);
                        sketching.discolor(imgData2.data);
                        t = +new Date;
                        data = Array.prototype.slice.call(imgData2.data, 0);
                        console.log(+new Date - t);
                        sketching.invert(data);
 
                        sketching.gaussBlur(data, imgData2.width, imgData2.height, 5);
                        
                        sketching.dodgeColor(imgData2.data, data);

                        ctx2.putImageData(imgData2, 0, 0);
                        // imgData2 = ctx.getImageData(0, 0, source.width, source.height);
                        // // discolor(imgData.data);
                        // sketching.discolor(imgData2.data);
                        // t = +new Date;
                        // ctx2.putImageData(imgData2, 0, 0);
                        // imgData = ctx2.getImageData(0, 0, source.width, source.height);
                        // console.log(+new Date - t);
                        // sketching.invert(imgData2.data);
 
                        // sketching.gaussBlur(imgData2.data, imgData2.width, imgData2.height, 5);
                        
                        // sketching.dodgeColor(imgData.data, imgData2.data);

                        // ctx2.putImageData(imgData, 0, 0);

                        break;
                    default:
                        break;
                }
            }
        }