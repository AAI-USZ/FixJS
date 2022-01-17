function(req, res){
    db.deleteAllNodes(
                    function (err, result) {
                        if (err) return err;

                        console.log("all nodes deleted...")

                        res.write('all good');
                    }
                      );
    res.end();
}