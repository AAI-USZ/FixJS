function (buffer) {
        this.frames = (buffer.duration * 1000) / this.FRAME_TIME;
        
        var k = 180,
            h = ~~(this.height / 2),
            len = ~~(buffer.length / k),
            lW = 1,
            i, value, chan;


        // var thisbox= document.querySelector('#cachedWave');
        // thisbox.width=len;   
        // this.width=len;
        
        console.log(this.width);
        this.cursorStep = this.width / this.frames;
        console.log('csstep'+this.cursorStep);
        this.cc.clearRect(0, 0, this.width, this.height);


        var slice = Array.prototype.slice;

        //version 1: max / maxmin avg
        // /* Left channel. */
        // chan = buffer.getChannelData(0);

        // console.log(Math.max.apply(Math, slice.call(chan,0,100)));
        // console.log(Math.min.apply(Math, slice.call(chan,0,100)));
        // if (chan) {
        //     for (i = 0; i < len; i++) {
        //         value = h * Math.max.apply(
        //             Math, slice.call(chan, i * k, (i + 1) * k)
        //         );
        //         value2 = 0.5 * h * [Math.min.apply(Math, slice.call(chan, i * k, (i + 1) * k))+Math.max.apply(Math, slice.call(chan, i * k, (i + 1) * k))];
        //         this.cc.fillRect(
        //             i, h - value, lW, value-value2
        //         );
        //     }
        // }

        // /* Right channel. */
        // chan = buffer.getChannelData(1);

        // if (chan) {
        //     for (i = 0; i < len; i++) {
        //         value = h * Math.max.apply(
        //             Math, slice.call(chan, i * k, (i + 1) * k)
        //         );
        //         value2 = 0.5 * h * [Math.min.apply(
        //             Math, slice.call(chan, i * k, (i + 1) * k)
        //         )+Math.max.apply(
        //             Math, slice.call(chan, i * k, (i + 1) * k)
        //         )];
        //         this.cc.fillRect(
        //             i, h+value2, lW, value-value2
        //         );
        //     }
        // }

        // //version2 abs(max/min) / maxmin avg
        // /* Left channel. */
        // chan = buffer.getChannelData(0);

        // console.log(chan[1000]);
        // console.log(Math.max.apply(Math, slice.call(chan,0,100)));
        // console.log(Math.min.apply(Math, slice.call(chan,0,100)));
        // if (chan) {


        //             this.cc.beginPath();
        //             this.cc.moveTo(0,h);


        //     for (i = 0; i < len; i++) {
        //         maxVal = h * Math.max.apply(
        //             Math, slice.call(chan, i * k, (i + 1) * k)
        //         );
        //         minVal= h * Math.min.apply(
        //             Math, slice.call(chan, i * k, (i + 1) * k)
        //         );

        //         if(Math.abs(maxVal)>=Math.abs(minVal)){

        //             this.cc.lineTo(i*lW, h-maxVal);
        //             // this.cc.fillRect(
        //             //     i, h-maxVal, lW, 0.5*maxVal-0.5*minVal
        //             // );
        //             // this.cc.fillRect(
        //             //     i, h+0.5*(maxVal+minVal),lW,0.5*(maxVal-minVal)
        //             // );
        //         }

        //         else{

        //             this.cc.lineTo(i*lW, h-minVal);
        //             // this.cc.fillRect(
        //             //     i, h-0.5*(maxVal+minVal), lW, 0.5*(maxVal-minVal)
        //             // );
        //             // this.cc.fillRect(
        //             //     i, h+minVal, lW, 0.5*(maxVal-minVal)
        //             // );

        //         }
        //     }
        //     this.cc.stroke();
        // }


        //version3 MAX-MIN
        /* Left channel. */
        // chan = buffer.getChannelData(0);

        // console.log(chan[1000]);
        // console.log(Math.max.apply(Math, slice.call(chan,0,100)));
        // console.log(Math.min.apply(Math, slice.call(chan,0,100)));
        // if (chan) {


        //     for (i = 0; i < len; i++) {
        //         maxVal = h * Math.max.apply(
        //             Math, slice.call(chan, i * k, (i + 1) * k)
        //         );
        //         minVal= h * Math.min.apply(
        //             Math, slice.call(chan, i * k, (i + 1) * k)
        //         );


        //             this.cc.fillRect(
        //                 i, h-maxVal, lW, 0.5*maxVal-0.5*minVal
        //             );
        //             this.cc.fillRect(
        //                 i, h+0.5*(maxVal+minVal),lW,-0.5*maxVal-1.5*minVal
        //             );

        //     }
        // }

        //version4 interpolation
        /* Left channel. */
        chan = buffer.getChannelData(0);

        console.log(Math.max.apply(Math, slice.call(chan,5000,5200)));
        console.log(Math.min.apply(Math, slice.call(chan,5000,5200)));

        var waveImage=this.cc.createImageData(this.width, this.height);

        if (chan) {

            for (i = 0; i < len; i++) {
                var temp=[]; templength=2*h;
                while (templength--){
                    temp[templength]=0;
                }

                for(j = i * k; j < (i+1) * k; j++){
                    if (chan[j]>=0){
                        temp[h-(~~(chan[j]*h))]++;
                    }
                    else{
                        temp[h+(~~(-(chan[j]*h)))]++;
                    }
                }
                
                //console.log(temp);
                
                for(y=0; y<waveImage.height; y++){
                    var index=(y*waveImage.width+i)*4;
                    //a way to color the data
                    waveImage.data[index]=0;
                    waveImage.data[index+1]=0;
                    waveImage.data[index+2]=200;
                    if (temp[y]){
                        var alpha=100+~~(155*(temp[y]/k));
                        waveImage.data[index+3]=Math.min(255,alpha);
                        //better way to assign alpha values

                    }
                    else{
                        waveImage.data[index+3]=0;
                    }
                }

            }
            this.cc.putImageData(waveImage,0,0);

        }


        }