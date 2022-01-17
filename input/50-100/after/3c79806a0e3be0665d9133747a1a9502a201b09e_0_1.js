function (request, response){

            // 쿠키에 저장되어 있는 값은 문자열이다 문자열 비교를 해주어야 한다.(책에서는 boolean값으로 비교해서 오류)

            if (request.cookies.auth == 'true'){

              // 로그인되어 있는 경우는

              response.writeHead(200,{'Content-Type': 'text/html'});

              response.write('<h1>Login Success</h1>');

              response.end();

            }else{

              // 로그인 되어 있지 않은 경우

              fs.readFile('./node.chapter.7-7.login.html', function (error, data){

                response.writeHead(200,{'Content-Type': 'text/html'});

                response.end(data);

              });

            }

          }