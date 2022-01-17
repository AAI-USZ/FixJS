function (req, res) { 

    var mailOpts, validation, smtpTrans, name = req.body.name, email = req.body.email, message = req.body.message, errMsg = '';

    

    validation = ragingflame.validate.fields({

        name: name, 

        email: email, 

        textarea: message

    });

    

    errMsg = validation.message;

    

    if (errMsg) {

        if (validation.errors > 1) {

            errMsg += ' contain invalid input.';

        }

        else {

            errMsg += ' contains invalid input.';

        }

        

        res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message not sent, ' + errMsg, err: true, page: 'contact' });

        return;

    }

    

    

    smtpTrans = nodemailer.createTransport('SMTP', {

        service: 'Gmail',

        auth: {

            user: ragingflame.email,

            pass: ragingflame.password

        }

    });

    

        

    mailOpts = {

        from: name + ' <' + email + '>',

        to: ragingflame.email,

        subject: 'Contact from rflab website',

        text: message

    };

    

        

    smtpTrans.sendMail(mailOpts, function (error, response) {

        if (error) {

            res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' });

        }

        else {

            res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' });

        }

    });

}