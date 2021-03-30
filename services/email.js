const Mailgen = require('mailgen')
const sgMail = require('@sendgrid/mail')
require('dotenv').config()

class EmailService {
  #sender = sgMail
  #GenerateTemplate = Mailgen
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000'
        break
      case 'stage':
        this.link = 'http://contacts-stage.heroku.com'
        break
      case 'production':
        this.link = 'http://contacts.heroku.com'
        break
      default:
        this.link = 'http://localhost:3000'
        break
    }
  }
  #createTemplate(verifyToken, name = 'Guest') {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'cerberus',
      product: {
        name: 'Contacts',
        link: this.link,
      },
    })
    const template = {
      body: {
        name,
        intro: 'Welcome!!!',
        action: {
          instructions: 'To get started, please click here:',
          button: {
            color: '#22BC66', 
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    }
    return mailGenerator.generate(template)
  }
  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name)
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: email,
      from: 'yulialab@i.ua',
      subject: 'Confirmation of registration',
      html: emailBody,
    }
    await this.#sender.send(msg)
  }
}

module.exports = EmailService