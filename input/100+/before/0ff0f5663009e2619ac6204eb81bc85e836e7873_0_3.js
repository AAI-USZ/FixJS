function cv_deleteMessage(messageId) {
    if (!messageId)
      return;

    MessageManager.deleteMessage(messageId, function(result) {
      if (result) {
        console.log('Message id: ' + messageId + ' deleted');
      } else {
        console.log('Impossible to delete message ID=' + messageId);
      }
    });
  }