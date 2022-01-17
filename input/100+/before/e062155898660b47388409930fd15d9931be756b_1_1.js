function(criteria_name){var sc=locals['Search Criteria'][this.sc_dict[criteria_name]];if(sc&&sc.add_col)
var acl=sc.add_col.split('\n');else
var acl=[];var new_sl=[];for(var i=0;i<acl.length;i++){var tmp=acl[i].split(' AS ');if(tmp[1]){var t=eval(tmp[1]);new_sl[new_sl.length]=[t,"`"+t+"`"];}}
this.set_sort_options(new_sl);if(sc&&sc.sort_by){this.dt.sort_sel.value=sc.sort_by;}
if(sc&&sc.sort_order){sc.sort_order=='ASC'?this.dt.set_asc():this.dt.set_desc();}
if(sc&&sc.page_len){this.dt.page_len_sel.inp.value=sc.page_len;}
this.current_loaded=criteria_name;this.set_main_title(criteria_name,sc.description);}