function(){
        
        var controls = '';
        
        controls += '<div style="float:left;margin:10px;border:1px solid grey;padding:5px;"><div style="text-align:center;text-decoration:underline;padding-bottom:5px;">Tools:</div><button id="resetview" type="button">Reset View</button></div>';
        
        controls += buildSessionControls('scatter');
        
        // --- //
        
        controls += '<div id="fieldcontrols" style="float:left;margin:10px;">';
        
        controls += '<table style="border:1px solid grey;padding:5px;"><tr><td style="text-align:center;text-decoration:underline;padding-bottom:5px;">X Axis:</tr></td>';
        
        controls += '<tr><td>';
        
        controls += '<div style="font-size:14px;font-family:Arial;text-align:center;color:#000000;float:left;">';
        
        controls += '<input class="xaxis" type="radio" name="xaxisselect" value="-1" checked></input>&nbsp;';
        
        controls += 'Datapoint #&nbsp;';
        
        controls += '</div>';
        controls += '</td></tr>';
        
        for( var i in data.fields ){
            //check if field is text
            if (data.fields[i].type_id != 37){ 
                controls += '<tr><td>';
                
                controls += '<div style="font-size:14px;font-family:Arial;text-align:center;color:#000000;float:left;">';
                
                controls += '<input class="xaxis" type="radio" name="xaxisselect" value="' + i + '" ></input>&nbsp;';
                
                controls += data.fields[i].name + '&nbsp;';
                
                controls += '</div>';
                controls += '</td></tr>';
            }
        }
        
        controls += '</table>';  
        controls += '</div>';
        
        controls += '<div id="fieldcontrols" style="float:left;margin:10px;">';
        controls += '<table style="border:1px solid grey;padding:5px;"><tr><td style="text-align:center;text-decoration:underline;padding-bottom:5px;">Fields:</tr></td>';
        
        for( var i in data.fields ){
            //check if field is time or text
            if( data.fields[i].type_id != 7 && data.fields[i].type_id != 37 ){
                
                controls += '<tr><td>';
                
                controls += '<div id="fieldvisiblediv' + i + '" style="font-size:14px;font-family:Arial;text-align:center;color:#000000;float:left;">';
                
                controls += '<input id="fieldvisible' + i + '" type="checkbox" value="' + i + '" ' + ( data.fields[i].visibility ? 'checked' : '' ) + '></input>&nbsp;';
                
                controls += data.fields[i].name + '&nbsp;';
                
                controls += '</div>';
                controls += '</td></tr>';
                
            }
            
        }
        
        controls += '</table>'
        controls += '</div>';
        
        controls += '<div style="clear:both;"></div>';
        
        // --- //
        
        controls += '';
        
        // --- //
        
        this.controls.innerHTML = controls;
        
    }