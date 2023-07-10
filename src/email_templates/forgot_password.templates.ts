export const forgotPasswordMail = ({ name, url }: {name: string, url: string }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Reset Password</title>
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
    <h1>Reset Your Password</h1>
    <p>Hello ${name},</p>
    <p>We received a request to reset your password. Click the button below to reset it:</p>
    <p><a href="${url}" class="btn">Reset Password</a></p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Regards,<br>Admin @SmartPass</p>
  </div>
</body>
</html>
`
