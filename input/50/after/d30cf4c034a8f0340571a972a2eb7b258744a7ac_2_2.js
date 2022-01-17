function(req, res)
{
    res.render(
        'auth',
        {
            authenticated : req.authenticated,
            FB_APP_ID: '397068970352801',
            domain: '127.0.0.1:3000'
        }
    );
}