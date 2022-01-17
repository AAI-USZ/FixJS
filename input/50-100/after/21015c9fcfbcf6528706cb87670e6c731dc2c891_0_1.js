function(err) {
      if (err) return res.send({ error: err.message });
      res.send({ message: 'updated state' });
    }