function(message) {
      return message.match(/(.+\n.\[3[12]m[\s\S]*)Failures:\s([\s\S]*)\n+Finished/m);
    }