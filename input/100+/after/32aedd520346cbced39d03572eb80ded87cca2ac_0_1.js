function overlib(){if(!olLoaded||isExclusive(overlib.arguments))return true;if(olCheckMouseCapture)olMouseCapture();if(over){over=(typeof over.id!='string')?o3_frame.document.all['overDiv']:over;cClick();}

olHideDelay=0;o3_text=ol_text;o3_cap=ol_cap;o3_sticky=ol_sticky;o3_background=ol_background;o3_close=ol_close;o3_hpos=ol_hpos;o3_offsetx=ol_offsetx;o3_offsety=ol_offsety;o3_fgcolor=ol_fgcolor;o3_bgcolor=ol_bgcolor;o3_textcolor=ol_textcolor;o3_capcolor=ol_capcolor;o3_closecolor=ol_closecolor;o3_width=ol_width;o3_border=ol_border;o3_cellpad=ol_cellpad;o3_status=ol_status;o3_autostatus=ol_autostatus;o3_height=ol_height;o3_snapx=ol_snapx;o3_snapy=ol_snapy;o3_fixx=ol_fixx;o3_fixy=ol_fixy;o3_relx=ol_relx;o3_rely=ol_rely;o3_fgbackground=ol_fgbackground;o3_bgbackground=ol_bgbackground;o3_padxl=ol_padxl;o3_padxr=ol_padxr;o3_padyt=ol_padyt;o3_padyb=ol_padyb;o3_fullhtml=ol_fullhtml;o3_vpos=ol_vpos;o3_aboveheight=ol_aboveheight;o3_capicon=ol_capicon;o3_textfont=ol_textfont;o3_captionfont=ol_captionfont;o3_closefont=ol_closefont;o3_textsize=ol_textsize;o3_captionsize=ol_captionsize;o3_closesize=ol_closesize;o3_timeout=ol_timeout;o3_function=ol_function;o3_delay=ol_delay;o3_hauto=ol_hauto;o3_vauto=ol_vauto;o3_closeclick=ol_closeclick;o3_wrap=ol_wrap;o3_followmouse=ol_followmouse;o3_mouseoff=ol_mouseoff;o3_closetitle=ol_closetitle;o3_css=ol_css;o3_compatmode=ol_compatmode;o3_fgclass=ol_fgclass;o3_bgclass=ol_bgclass;o3_textfontclass=ol_textfontclass;o3_captionfontclass=ol_captionfontclass;o3_closefontclass=ol_closefontclass;

setRunTimeVariables();

fnRef='';

o3_frame=ol_frame;

if(!(over=createDivContainer()))return false;

parseTokens('o3_',overlib.arguments);if(!postParseChecks('o3_',overlib.arguments))return false;

if(o3_delay==0){return runHook("olMain",FREPLACE);}else{o3_delayid=setTimeout("runHook('olMain',FREPLACE)",o3_delay);return false;}}