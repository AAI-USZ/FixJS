function(err) {
                if (err === null) {
                    res.json({
                        success: true,
                        message: "user created"
                    });
                    //logger.info(_.inspect(req));
                    emailhash = crypto.createHash('md5').update(user.email).digest('hex');
					bootweb.sendMessage({ 
					   text: "I hope",
					   from: nconf.get('email:template:system:from'), 
					   to: user.email,
					   cci:     nconf.get('email:template:system:cci'), 
					   subject: "Activation de votre compte",
					   attachment:
					    [
					      {data:mailTpl.render({
							but:"Activer votre compte",
							texte:"activer votre compte",
							lien: "http://" + req.headers['host'] + "/activate/" + user.key + "/" + emailhash //
							}), alternative:true}
					    ]
					},function(err){
						if (err !== null){
							logger.info(_.inspect(err));
						}
					});
                } else {
                	res.statusCode = 500;
                	res.json({success: false, err: err});
                }
            }