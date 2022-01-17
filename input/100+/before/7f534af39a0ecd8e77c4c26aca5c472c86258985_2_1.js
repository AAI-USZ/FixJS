function ok(yeah) {
        res.writeHead(yeah ? 200 : 500);
        res.write(yeah ? 'ok' : 'not ok');
        res.end();
      }