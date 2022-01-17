function() {
        if( curVis != null )
            curVis.end();
        
        //Flip previously selection				
            $('#vis_select  > li > a').css('background-color', '#ccc');
            $('#vis_select  > li > a').css('border-bottom','1px solid black');
            
            //Set new selection			 
            curVis = eval(this.text.toLowerCase());
            $(this).css("background-color", "#ffffff");
            $(this).css('border-bottom','1px solid white');
            if( !curVis.inited )
                curVis.init(data);
            else
                curVis.start(data);
            
    }