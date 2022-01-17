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
                    t = +new Date;
                        imgData2 = ctx.getImageData(0, 0, source.width, source.height);
                        // discolor(imgData.data);
                        sketching.discolor(imgData2.data);
                        
                        data = Array.prototype.slice.call(imgData2.data, 0);
                        
                        sketching.invert(data);
 
                        sketching.gaussBlur(data, imgData2.width, imgData2.height, 5);
                        
                        sketching.dodgeColor(imgData2.data, data);

                        ctx2.putImageData(imgData2, 0, 0);
console.log(+new Date - t);
                        break;
                    default:
                        break;
                }
            }
        }