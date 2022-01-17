function () {
      console.log(request.responseText);
      var response = JSON.parse(request.responseText);

      console.log(response);
      if(response.result == 'found') {
        var token = response.token;
        console.log(token);

        self.setGithubToken(token);
        self.setIsSigned(true);
        document.getElementById('commit').innerHTML = 'Commit';
      } else {
        console.log('Not logged yet.');
      }
    }