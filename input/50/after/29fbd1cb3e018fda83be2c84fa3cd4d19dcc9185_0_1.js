function(err, result) {
            if (err) console.log(err);
            else if (result && result.Error)
              console.log(JSON.stringify(result.Error));
        }