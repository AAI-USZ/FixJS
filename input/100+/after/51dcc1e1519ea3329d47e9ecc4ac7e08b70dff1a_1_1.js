function getMobileHTML(all){
  var optns="", i, len, o;
  for(i=0, len=vote_options_list.length; o=vote_options_list[i++];){
    optns += (o != NO_VOTES) ? '<li onClick="vote($(this), \'' + (i-1) +'\')"><a href="javascript:void(0)">' + o + '</a></li>' : o;
  }
  
  if(optns=="")
    optns = "no voting right now";
  
  if(vote_options_list.length > 5)
    optns += '<li><form action="/option" method="post">'+
    '<input name="text" placeholder="Other..." />'+
    '<input type="submit" value="Submit" />'+
    '</form></li>';
  
  if(vote_options_list.length > 1)
    optns = "<ol>" + optns + "</ol>";

  if(!all)
    return optns;
  
  return page('<h3>WormBase Redesign</h3>'+
    '<div id="content">' + 
    optns + 
    '</div>' +
    '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>' + 
    '<script>'+
    'var votes = [];' +
    'function vote(obj, v){'+
    ' var a = (obj.hasClass("chosen")) ? -1 : 1;'+
    ' if(a>0){' +
    '   votes.push(v);' + 
    ' }else{' + 
    '   votes.splice(votes.indexOf(v), 1);' +
    ' }' +
    ' console.log(votes);' +
    '  obj.toggleClass("chosen");'+
      '$.ajax({'+
      '  type: "POST",'+
      '  url: "/votes",'+
      '  data: {vote:v, amt:a}' + 
      '});'+
    '}'+
    'function load_options(){'+
    '$.ajax({'+
    '  type: "POST",'+
    '  url: "/mobile",'+
    '  data: "none",' + 
    '  success: function(data){' +
    '    var i, len, opts = $("#content").html(data).find("ol li");' +
    '    if(opts.size() > 0){' +
          'for(i=0, len=votes.length; i<len; i++){' +
          '  $(opts.get(votes[i])).addClass("chosen");' +
          '}' +
    '    }else{' +
    '      votes = [];' +
    '    }' +
    '    load_options();'+
    '  }'+
    '});'+
    '}'+
    '$(window).load(function() {' +
    '  setTimeout(function() {' +
    '      load_options();' +
    '  }, 10);' +
    '});' +
    '</script>');
}