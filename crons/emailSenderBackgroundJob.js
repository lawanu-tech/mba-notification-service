const cron = require('node-cron')
const TicketNotificationModel = require('../models/ticketNotification.model')
const EmailTransporter = require('../notifier/emailService')

cron.schedule('*/30 * * * * *', async () => {
    console.log("I am background job")

    //Query all the notification documents which are in status "NOT_SENT"

    const notifications = await TicketNotificationModel.find({
        status: "NOT_SENT"
    })
   
    if(notifications && notifications.length > 0){
        notifications.forEach(notification => {
            const mailData = {
                from: "bhh.lawanu@gmail.com",
                to: notification.recepientEmails,
                subject: notification.subject,
                text: notification.content
            }

            //Send the email
            EmailTransporter.sendMail(mailData, async function (err, info) {
                if(err){
                   
                    console.log(err.message)
                }else{
                    console.log(info)
                    //Update the notification document status
                    notification.status = "SENT"
                    await notification.save()
                }
            })
        })
    }
})