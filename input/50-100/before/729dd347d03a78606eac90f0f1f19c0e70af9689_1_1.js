function (error, source) {
        if (error) callback(error);
        else callback(null, new (xmldom.DOMParser)().parseFromString(source));
      }