function (url, fn) {
      var client = new XMLHttpRequest()
      client.onreadystatechange = fn
      client.open("GET", url + "?timestamp=" + this.timestamp)
      client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8")
      client.send()
    }