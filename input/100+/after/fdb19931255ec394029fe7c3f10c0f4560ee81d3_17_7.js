function(data,date_str){if(!date_str)date_str=data.modified;data.when=dateutil.str_to_user(date_str).split(' ')[0];var diff=dateutil.get_diff(dateutil.get_today(),date_str.split(' ')[0]);if(diff==0){data.when=dateutil.comment_when(date_str);}
if(diff==1){data.when='Yesterday'}
if(diff==2){data.when='2 days ago'}}