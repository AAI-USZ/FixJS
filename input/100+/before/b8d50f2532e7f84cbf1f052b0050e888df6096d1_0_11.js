function prepYT(embed) {
    var js_str = '?enablejsapi=1&version=3&playerapiid=ytplayer';
    if(embed.indexOf('?version=3"') != -1){
        split = embed.indexOf('?version=3"');
        embed = embed.substr(0,split)+js_str+embed.substr(split+10);
    }else if(embed.indexOf('&version=3"') != -1){
        split = embed.indexOf('&version=3"');
        embed = embed.substr(0,split)+js_str+embed.substr(split+10);
    }
    
    if(embed.indexOf('?version=3" type="') != -1){
        split = embed.indexOf('?version=3" type="');
        embed = embed.substr(0,split)+js_str+embed.substr(split+10);
    }else if(embed.indexOf('&version=3" type="') != -1){
        split = embed.indexOf('&version=3" type="');
        embed = embed.substr(0,split)+js_str+embed.substr(split+10);
    }
    split = embed.indexOf('embed')+5;
    embed = embed.substr(0,split)+' id="ytplayer" wmode="transparent"'+embed.substr(split);
    return embed;
}