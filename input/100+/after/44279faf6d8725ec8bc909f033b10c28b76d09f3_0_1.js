function(err, data) {
      if (err) {
        console.log(err);
        return res.send({
          status: 500,
          message: err
        }, 500);
      } else {
        return Image.create(data, req.user, function(err, img) {
          if (err) {
            console.log(err);
            return res.send({
              status: 500,
              message: err
            }, 500);
          } else {
            console.log(img);
            return res.send(JSON.stringify({
              status: 200,
              imageId: img._id,
              imageUrl: img.url("100x100")
            }));
          }
        });
      }
    }