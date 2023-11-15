const EmailTransporter = require('./emailService');

const emailObj = {
    from: 'crmtestuser100@gmail.com',
    to: 'jeevendra.singh1992@gmail.com',
    subject: 'Test email from CRM',
    text: 'Hello! Welcome to CRM'
}

EmailTransporter.sendMail(emailObj, async function (err, info) {
    if(err){
        console.log(err.message)
    }else{
        //Mark the status as SENT
        console.log(info);
    };
});