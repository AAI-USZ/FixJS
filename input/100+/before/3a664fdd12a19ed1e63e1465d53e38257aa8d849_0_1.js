function () {
    if (r !== text) console.log(r, text);
    assert.equal(r, text)
    resp.writeHead(200, {'content-type':'text/plain'})
    resp.write('OK')
    resp.end()
    }