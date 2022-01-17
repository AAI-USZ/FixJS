f  "use strict";
  var ender = require('ender')
    , $ = ender
    , reqwest = require('reqwest')
    , window = require('window')
    , document = window.document
    , location = window.location
    , uiTabs = require('./ui-tabs')
    , io = require('socket.io-browser')
    , socket
    , pd = require('pretty-data').pd
    , pure = require('./pure-inject')
    , visual = require('./visual')
    ;
  
  $(document).ready(function() {
    var options = {};
    options.body = '';
    openSocket(options);
    uiTabs.create('body', '.js-ui-tab a', '.js-ui-tab', '.js-ui-tab-view', 'http');
    reqwest({
      url: 'http://'+window.location.host+'/onPageLoad'
    , type: 'json'
    , method: 'get'
    , error: function (err) { 
        console.log('Server Error: ', err);
        options.body = 'Cannot communicate with netbug server';
        options.cssClass = 'css-streamError';
        injectMessage(options);
      }
    , success: function (resp) {
        var html, i;
        if(!resp.error){
          initBuild(resp);
        }
        else{
          options.cssClass = 'css-streamError';
          for(i=0; i < resp.errors.length; i=i+1){
						options.body += resp.errors[i].message;
					}
        }
        injectMessage(options);
      }
    });
  });
  
  
  //EVENT LISTENERS ALL
  $('.container').on('.js-all-stream pre', 'click', function(){
    $(this).toggleClass('css-hl-block');
  });
  $('.container').on('.js-ui-tab-view:not(.css-active) .js-openSocket', 'click', function(){
    makeRequest($(this).attr('data-protocol'));
	});
  $('.container').on('.js-ui-tab-view:not(.css-active) .js-portNum', 'keypress', function(e){
    if(e.keyCode === 13){
      $('.js-openSocket.js-'+$(this).attr('data-protocol')).trigger('click');
    }
  });
  $('.container').on('.js-scroll', 'change', function(){
    scrollLock({protocol: $(this).attr('data-protocol')});
  });
  $('.container').on('.js-clear', 'click', function(){
    $('.js-'+$(this).attr('data-protocol')+'-stream').html('');
  });
  $('.container').on('.js-ui-tab-view:not(.css-inactive) .js-log', 'click', function(){
    socket.emit('log' + $(this).attr('data-protocol'));
    $('.js-log.js-' + $(this).attr('data-protocol')).toggleClass('activeLog');
  });
  $('.container').on('.js-ui-tab-view:not(.css-inactive) .js-closeSocket', 'click', function(){
    $('.js-log.activeLog.js-'+$(this).attr('data-protocol')).trigger('click');
    socket.emit('kill' + $(this).attr('data-protocol'));
  });
   $('.container').on('.js-ui-tab', 'click', function(){
    setTimeout( scrollLock({protocol: $(this).attr('data-protocol')}), 100 );
  });

  //EVENT LISTENERS HTTP
  $('.container').on('.js-include-headers', 'change', function(){
    socket.emit('includeHeaders', $('.js-include-headers').attr('checked'));
  });
  
  function makeRequest(protocol) {
    var options = {}
      , port = $('.js-portNum.js-'+protocol).val()
      ;
    options.body = '';
    options.protocol = protocol;
    reqwest({
      url: 'http://'+window.location.host+'/listen'+protocol+'/'+port
    , type: 'json'
    , method: 'get'
    , error: function (err) { 
        console.log('Server Error: ', err);
        options.body = 'Cannot communicate with netbug server';
        options.cssClass = 'css-streamError';
        injectMessage(options);
      }
    , success: function (resp) {
        var html, i;
        if(!resp.error){
          options.active = true;
          visual.stateChange(options);
          options.body += 'Socket opened succesfully. Listening on port: '+ port;
          options.cssClass = 'css-streamNewConnection';
        }
        else{
          options.cssClass = 'css-streamError';
          for(i=0; i < resp.errors.length; i=i+1){
						options.body += resp.errors[i].message;
					}
        }
        injectMessage(options);
      }
    });
    openSocket(options);
  }
 
//SOCKET COMMUNICATION WITH SERVER 
  function openSocket(options) {
    socket = io.connect('http://'+window.location.hostname+':3454');
    socket.on('connect', function () {
      socket.send('hi');
      socket.on('message', function (msg) {
        options.body = msg;
        injectCode('tcp', options);
      });
      socket.on('httpData', function (msg) {
        injectCode('http', msg);
      });
      socket.on('udpData', function (msg) {
        injectCode('udp', msg);
      });
      socket.on('seperateFiles', function (protocol) {
        if($('.js-'+protocol+'-multifile').attr('checked')) {
          socket.emit('writeFile', protocol);
        }
      });
      socket.on('connectionChange', function (count, closed) {
        $('.js-tcp-connection-count').html(count);
        if(closed){
          options.body = 'Socket Closed';
          options.cssClass = 'css-streamCloseConnection';
        }
        else{
          options.body = 'New Socket Opened';
          options.cssClass = 'css-streamNewConnection';
        }
        options.protocol = 'tcp';
        injectMessage(options);
      });
      socket.on('closedConnection', function(num, protocol){
        options.body = 'Closed Connection on '+num;
        options.cssClass = 'css-streamCloseConnection';
        visual.stateChange({
          active: false,
          protocol: protocol
        });
        options.protocol = protocol;
        injectMessage(options);
      });
      socket.on('disconnect', function () { 
        console.log('Browser-Disconnected socket');
        options.cssClass = 'css-streamError';
        options.body = 'NetBug Server Down';
        options.protocol = 'all';
        injectMessage(options);
        options.active = false;
        $('.js-log.activeLog').trigger('click');
        visual.stateChange(options);
      });
    });
  }
  
  function initBuild(resp){
    var options = {};
    options.body = '';
    Object.keys(resp.result).forEach(function(protocol){
      if(resp.result[protocol].open){
        options.protocol = protocol;
        visual.stateChange(options);
        options.body = 'Socket open. Listening on port: '+ resp.result[protocol].port;
        options.cssClass = 'css-streamNewConnection';
        injectMessage(options);
        $('.js-portNum.js-'+protocol).val(resp.result[protocol].port);
      }
    });
  }  

  function scrollLock(options) {
    if($('.js-scroll.js-'+options.protocol).attr('checked')){
      $('.js-'+options.protocol+'-stream')[0].scrollTop = $('.js-'+options.protocol+'-stream')[0].scrollHeight;
    }
    if($('.js-'+options.protocol+'-stream')[0].scrollHeight > 12000){
      $('.js-'+options.protocol+'-stream span').first().remove();
      $('.js-'+options.protocol+'-stream span').first().remove();
    }
  }

  function injectMessage(options) {
    pure.injectMessage(options.protocol, {
      'message': options.body,
      'class': options.cssClass
    });
    scrollLock(options);
  }

  function injectCode(protocol, options) {
    var data = {};      
    data.code = options.headers || '';
    data = processBody(options, data);
    pure.injectCode(protocol, data);
    options.protocol = protocol;
    scrollLock(options);
    visual.highlightMsg(options);
  }
  
  function processBody(options, data) {
    var xml
      , xml_pp
      , json_pp
      ;
    //if xml
    if(options.body.substring(0,3) === '<?x'){
      xml_pp = pd.xml(options.body);
      xml = xml_pp.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;');
      data.xml = xml;
    }
    //if json
    else if(options.body.charAt(0) === '{'){
      json_pp = JSON.parse(options.body);
      json_pp = JSON.stringify(json_pp, null, '  ');
      json_pp = visual.syntaxHighlight(json_pp);
      data.code += json_pp;
    }
    else{
      data.code += options.body;
    }
    return data;
  }
}());
