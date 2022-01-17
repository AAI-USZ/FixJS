function mandrill(path, opts, callback)

    {

        var format = path.split('.');



        if (format.length == 0) format = 'json';

        else format = format[1].toLowerCase();



        if (typeof opts == 'function')

        {

            var callback = opts;

            opts = { key: key };

        }



        var requestOptions = {

            method: 'POST',

            url: MANDRILL_API_ROOT + path,

        };



        requestOptions['body'] = JSON.stringify( _.extend({ key: key }, opts) );

        

        request(requestOptions, function(error, response, body)

        {

            if (typeof callback == 'function')

            {

                if (!error)

                {

                    //everything is good!

                    if (format == 'json')

                    {

                        body = JSON.parse(body);

                    }



                    if (response['statusCode'] >= 200 && response['statusCode'] < 300)

                    {

                        callback(null, body);

                    }

                    else

                    {

                        callback(body);

                    }

                }

                else

                {

                    callback(error);

                }

            }

        });

    }