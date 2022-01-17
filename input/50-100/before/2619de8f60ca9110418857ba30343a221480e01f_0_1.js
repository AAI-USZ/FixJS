f        if (strict && '{' != buf[0] && '[' != buf[0]) return next(utils.error(400));
        try {
          req.body = JSON.parse(buf, options.reviver);
          next();
        } catch (err){
          err.body = buf;
          err.status = 400;
          next(err);
        }
      });
