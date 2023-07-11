import mailjet from 'node-mailjet'
import envs from '../envs'
import AppError from '../shared/AppError'

const generateMailMessage = (content: string, subject: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f6f6;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #333333;
      font-size: 24px;
      margin-bottom: 20px;
    }

    p {
      color: #777777;
      margin-bottom: 20px;
    }

    .btn {
      display: inline-block;
      background-color: #3498db;
      color: #ffffff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    ${content}
  </div>
</body>
</html>
`

const mail = mailjet.Client.apiConnect(
    envs.mail.api_key,
    envs.mail.api_secret
)

export const sendMail = async (email: string, name: string, subject: string, template: string) => {
    const mailMessage = generateMailMessage(template, subject)
    const data = {
        from: {
            Email: envs.mail.sender,
            Name: 'StrongPass Admin'
        },
        to: [
            {
              Email: email,
              Name: name,
            },
          ],
        subject,
        HTMLPart: mailMessage,
    }

    try {
        const send = await mail.post('send', { version: 'v3.1'}).request({ Messages: [data] })

        return { data: send }
    } catch (err) {
        const error = new AppError((err as Error).message)
        error.addMetadata((err as Error))
        return { error }
    }
}
