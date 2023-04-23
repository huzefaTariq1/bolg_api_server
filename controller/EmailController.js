const nodemailer=require("nodemailer")

const receiveEmail=async(req,res)=>{
    const { name,phone,subject, email, message } = req.body;

    if (!name || !phone || !subject || !email ||!message){
      return  res.status(400).json({message:"All Fields must be filled"})
    }
   

    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });


      const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: subject,
        html: `
        <!doctype html>
        <html lang="en-US">
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Reset Password Email Template</title>
            <meta name="description" content="Reset Password Email Template.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                             cellpadding="0" cellspacing="0">
                            
                            <tr>
                                <td>
                                    <table width="95%" border="0"  cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; -webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have received email
                                                    from client</h1>
                                                <span
                                                    style="display:inline-block;  margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                    <p style="color:#455056; vertical-align:left; font-size:15px;line-height:24px; margin:0;">
                                                    Name=${name}
                                                    </p>
                                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    Phone=${phone}
                                                    </p>
                                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    Email=${email}
                                                    </p>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                Message=${message}
                                                </p>
                                           
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                           
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>
        </html>`,
                html: `
        <!doctype html>
        <html lang="en-US">
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Reset Password Email Template</title>
            <meta name="description" content="Reset Password Email Template.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                             cellpadding="0" cellspacing="0">
                           
                            <tr>
                                <td>
                                    <table width="95%" border="0"  cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                           
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have received email
                                                from client</h1>
    
                                                <span
                                                    style="display:inline-block;  margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                    <p style="color:#455056; vertical-align:left; font-size:15px;line-height:24px; margin:0;">
                                                    Name=${name}
                                                    </p>
                                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    Phone=${phone}
                                                    </p>
                                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    Email=${email}
                                                    </p>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                   Message=${message}
                                                </p>
                                           
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                           
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>
        </html>`,
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(400).json({ messgae: "Error" });
        }
        return res.status(200).json({ messgae: "Email Sent" });
      });
}

module.exports = {
    receiveEmail
  };