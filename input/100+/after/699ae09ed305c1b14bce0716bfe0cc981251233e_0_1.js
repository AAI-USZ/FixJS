function(str,id){
            //Find next position for the div
            n_pos = $.webwindows.get_pos(N_POS)[0];
            //Dont display it
            document.getElementById('pane'+id).style.visibility='hidden';
            //Create minimise bar
            tnode=document.createElement('div');
            tnode.id='min_win'+id;
            //
            tnode.setAttribute("onmouseover", "document.activeMind="+n_pos+";");
            tnode.className='mind';
            //tnode.style.left=(258*n_pos)-250+'px';
            //which is infact
            //tnode.style.left=(mc[0]-1)*250+(8*mc[0])+'px';
            min_str = '<span>'+str+'</span><a href="#" class="max" rel="'+id+'">[]</a><a href="#" class="close" rel="'+id+'">X</a>';
            tnode.innerHTML=min_str;
            //console.log(tnode);
            $('.webwin_min_bar').append(tnode);
        }