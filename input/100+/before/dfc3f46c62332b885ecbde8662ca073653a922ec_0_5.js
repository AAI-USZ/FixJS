function createRelatedWebTopic(url, notetitle, body) {

  // 

  var selectedText = cleanUpForJson(body);

  var givenTitle = cleanUpForJson(notetitle);

  var webpageTitle = cleanUpForJson(getCurrentPageTitle());

  // 

  var notetopic = '{"uri":"","type_uri":"dm4.notes.note","composite":{"dm4.notes.title":"'+givenTitle+'","dm4.notes.text":"'+selectedText+'"}}';

  var webtopic = '{"uri":"","type_uri":"dm4.webbrowser.web_resource","composite":{"dm4.webbrowser.web_resource_description":"'+webpageTitle+'","dm4.webbrowser.url":"'+url+'"}}';

  // 

  // mark down other topic to be able to create it after the result arrived for the first topic..

  topicOrigin = notetopic;

  // send resource (first) topic 

  getTopicByValueAndType('dm4.webbrowser.url', url, function(responseText) {

    if (responseText != undefined) {

      // just saving the "Notice" and associating it to the just loaded URL.

      createRelatedTopicHandler(responseText);

    } else {

      sendTopicPost(webtopic, createRelatedTopicHandler);

    }

  });

}