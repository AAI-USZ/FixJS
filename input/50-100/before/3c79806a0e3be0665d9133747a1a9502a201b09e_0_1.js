function (request, response){

            if (request.cookies.auth == true){

              // 로그인되어 있는 경우는

              response.writeHead(200,{'Content-Type': 'text/html'});

              response.write('<h1>Login Success</h1>');

              response.end();

            }else{

              // 로그인 되어 있지 않은 경우

              fs.readFile('/node.chapter.7-7.login.html', function (error, data){

                response.writeHead(200,{'Content-Type': 'text/html'});

                response.write(data);

                response.end();

              });

            }

          }