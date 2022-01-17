function setDetailText(mymessage, host, mydate, priority, tag, facility) {

    var host_query_helper = ""
    var facility_query_helper = ""
    var priority_query_helper = ""
    var tag_query_helper = ""
    
    // Set Query Helpers
    if(mymessage.length > 0) {
        
        host_query_helper = getSearchExcludeButtons('fromhost', host);
        facility_query_helper = getSearchExcludeButtons('facility', facility);
        priority_query_helper = getSearchExcludeButtons('priority', priority);
        tag_query_helper = getSearchExcludeButtons('syslogtag', tag);        
    }
    
    
    var message_detail = document.getElementById('message_detail');
    message_detail.innerHTML = mymessage;
    
    var host_detail = document.getElementById('host_detail');  
    host_detail.innerHTML = host_query_helper + ' ' + host;
    
    var facility_detail = document.getElementById('facility_detail');  
    facility_detail.innerHTML = facility_query_helper + ' ' + facility;
    
    var date_detail = document.getElementById('date_detail');  
    date_detail.innerHTML = mydate;
    
    var priority_detail = document.getElementById('priority_detail');   
    priority_detail.innerHTML = priority_query_helper + ' ' + priority;
    
    var tag_detail = document.getElementById('tag_detail');  
    tag_detail.innerHTML = tag_query_helper + ' ' + tag;
}