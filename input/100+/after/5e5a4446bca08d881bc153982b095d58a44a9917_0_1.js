function(client, message)
{ 
  if(message == null)
  {
    messageLogger.warn("Message is null!");
    return;
  }
  if(!message.type)
  {
    messageLogger.warn("Message has no type attribute!");
    return;
  }
  
  //Check what type of message we get and delegate to the other methodes
  if(message.type == "CLIENT_READY")
  {
    handleClientReady(client, message);
  }
  else if(message.type == "COLLABROOM" && typeof message.data == 'object'){
    if (message.data.type == "USER_CHANGES")
    {
      handleUserChanges(client, message);
    }
    else if (message.data.type == "USERINFO_UPDATE")
    {
      handleUserInfoUpdate(client, message);
    }
    else if(message.data.type == "CHAT_MESSAGE")
    {
      handleChatMessage(client, message);
    }
    else if(message.data.type == "CLIENT_MESSAGE" &&
            typeof message.data.payload == 'object' &&
            message.data.payload.type == "suggestUserName")
    {
      handleSuggestUserName(client, message);
    }
  }
  //if the message type is unknown, throw an exception
  else
  {
    messageLogger.warn("Dropped message, unknown Message Type " + message.type);
  }
}