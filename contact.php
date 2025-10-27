<?php
// Contact form handler using PHPMailer + Dotenv

require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// --- Load .env ---
if (file_exists(__DIR__ . '/.env')) {
  Dotenv::createImmutable(__DIR__)->safeLoad();
}

// Safe env reader with default
function envv(string $key, $default = null) {
  if (isset($_ENV[$key]) && $_ENV[$key] !== '') return $_ENV[$key];
  $v = getenv($key);
  return ($v !== false && $v !== '') ? $v : $default;
}

// Simple JSON responder
function respond($ok, $msg) {
  header('Content-Type: application/json');
  echo json_encode(['type' => $ok ? 'success' : 'error', 'message' => $msg]);
  exit;
}

// Validate request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(false, 'Invalid request method.');
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['message'] ?? '');
if ($name === '' || $email === '' || $message === '') respond(false, 'Please fill in all required fields.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL))       respond(false, 'Please enter a valid email address.');

// Pull config from .env with sane defaults for local dev
$toEmail = envv('MAIL_TO_ADDRESS', 'info@swiftdesigns.studio');
$toName  = envv('MAIL_TO_NAME',    'Swift Designs Team');

$fromEmail = envv('MAIL_FROM_ADDRESS', 'no-reply@swiftdesigns.studio');
$fromName  = envv('MAIL_FROM_NAME',    'Swift Designs Website');

$host = envv('MAIL_HOST', 'smtp.porkbun.com');
$port = (int) envv('MAIL_PORT', 467);
$usr  = envv('MAIL_USERNAME', 'corey.shamburger@swiftdesigns.studio');
$pwd  = envv('MAIL_PASSWORD', 'ShamDawg334$');
$enc  = strtolower((string) envv('MAIL_ENCRYPTION', 'tls')); // 'tls' or 'ssl'
$subject = envv('MAIL_SUBJECT', 'New Contact Form Message — Swift Designs');

// Hard stop if the key addresses are missing
if (!$toEmail)   respond(false, 'Mail configuration error: missing MAIL_TO_ADDRESS.');
if (!$fromEmail) respond(false, 'Mail configuration error: missing MAIL_FROM_ADDRESS.');

// Map encryption to PHPMailer constants
$encConst = ($enc === 'ssl')
  ? PHPMailer::ENCRYPTION_SMTPS
  : PHPMailer::ENCRYPTION_STARTTLS;

// Build message bodies
$html = "<h3>New Contact Message from Swift Designs</h3>
<p><strong>Name:</strong> ".htmlspecialchars($name, ENT_QUOTES)."</p>
<p><strong>Email:</strong> ".htmlspecialchars($email, ENT_QUOTES)."</p>
<p><strong>Message:</strong><br>".nl2br(htmlspecialchars($message, ENT_QUOTES))."</p>";

$text = "New Contact Message from Swift Designs\n"
      . "=====================================\n"
      . "Name: {$name}\nEmail: {$email}\nMessage:\n{$message}\n";

$mail = new PHPMailer(true);

try {
  // SMTP setup
  $mail->isSMTP();
  $mail->Host       = $host;
  $mail->SMTPAuth   = true;
  $mail->Username   = $usr;
  $mail->Password   = $pwd;
  $mail->SMTPSecure = $encConst;
  $mail->Port       = $port;
  $mail->CharSet    = 'UTF-8';

  // From / To
  $mail->setFrom($fromEmail, $fromName);
  $mail->addAddress($toEmail, $toName);
  $mail->addReplyTo($email, $name);

  // Content
  $mail->isHTML(true);
  $mail->Subject = $subject;
  $mail->Body    = $html;
  $mail->AltBody = $text;

  $mail->send();
  respond(true, 'Message sent successfully. Thank you — I will reply soon.');
} catch (Exception $e) {
  respond(false, 'Mailer error: ' . $mail->ErrorInfo);
}
