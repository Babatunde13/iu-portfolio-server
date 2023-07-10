export const verifyAccount = ({ name, url }: {name: string, url: string }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verify Your Account</title>
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
    <h1>Verify Your Account</h1>
    <p>Hello ${name},</p>
    <p>Thank you for creating an account with us. To verify your email address, please click the button below:</p>
    <p><a href="${url}" class="btn">Verify Account</a></p>
    <p>If you did not create an account, please ignore this email.</p>
    <p>Regards,<br>Your Website Team</p>
  </div>
</body>
</html>
`
