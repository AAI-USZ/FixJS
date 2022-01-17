function () {
  "use strict";
  var ender = require('ender')
    , $ = ender
    , pure = require('./pure').$p
    , messageDir
    , messageTemplate
    , codeDir
    , codeTemplate
    , timestampDir
    , timestampTemplate
    ;
  messageDir = {
    'span': 'message',
    '@class': 'class'
  };
  codeDir = {
    'span': 'code',
    'code': 'xml'
  };
  timestampDir = {
    'div': 'time'
  };

  timestampTemplate = pure('.js-timestamp-template').compile(timestampDir);
  messageTemplate = pure('.js-message-template').compile(messageDir);
  codeTemplate = pure('.js-code-template').compile(codeDir);

  function injectMessage(protocol, data) {
    $('.js-'+protocol+'-stream').append(addTime() + messageTemplate(data));
  }
  
  function injectCode(protocol, data) {
    $('.js-'+protocol+'-stream').append(addTime() + codeTemplate(data));
  }
  
  function addTime () {
    return timestampTemplate({'time': new Date().toString()});
  }

  module.exports.injectCode = injectCode;
  module.exports.injectMessage = injectMessage;
}