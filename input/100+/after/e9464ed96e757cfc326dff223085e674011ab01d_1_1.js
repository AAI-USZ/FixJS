function click_ball(x,y) {   
    if (count(blank) == 0) {
        setMsg("msg",lang['gameover']);
        setMsg("starta",lang['mnu_start']);
        lock();
    }   

    if (!locked && !get(x,y).locked){
        var basemsg=lang['m_cell'] + " " + colorName(get(x,y).color) + " (" + x + "," + y + ") ";
        if(!selected && get(x,y).color != blank) {
            setMsg("msg",basemsg + lang['m_selected']);
            selected=true;
            get(x,y).select();
            xs=x;
            ys=y;
        }
        else {
            if (selected && (get(x,y).color  == blank) ) {
	        setMsg("msg",lang['m_ball'] + " " + lang['m_movedto'] + " (" + x + "," + y + ")");
                selected=false;
                get(xs,ys).unSelect();
                xd=x;
                yd=y;
                move();
            }
            else if (get(x,y).color != blank) {
	        
                if(xs!=x || ys!=y) get(xs,ys).unSelect();
                if(xs==x && ys==y) {
                    setMsg("msg",basemsg + lang['m_unselected']);
                    selected=false;
                    get(xs,ys).unSelect();
                }
                else {
                    setMsg("msg",basemsg + lang['m_selected']);
                    get(x,y).select();
                }
                xs=x;
                ys=y;
            } 
        }
    }
}