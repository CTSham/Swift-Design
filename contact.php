<?php
// Contact form handler using PHPMailer (SMTP) for reliable delivery
// Requirements: run `composer install` to pull in phpmailer/phpmailer dependency

require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load environment variables (.env) if present
if (file_exists(__DIR__ . '/.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->safeLoad();
}

function envv($key, $default = null) {
    return isset($_ENV[$key]) && $_ENV[$key] !== '' ? $_ENV[$key] : $default;
}

// ---------------- CONFIGURATION ----------------
$config = [
    'toEmail'       => envv('MAIL_TO_ADDRESS', 'info@swiftdesigns.studio'),
    'toName'        => envv('MAIL_TO_NAME', 'Portfolio Contact'),
    'subject'       => envv('MAIL_SUBJECT', 'New message from contact form'),
    'fromEmail'     => envv('MAIL_FROM_ADDRESS', 'info@swiftdesigns.studio'),
    'fromName'      => envv('MAIL_FROM_NAME', 'Swift Designs Website'),
    'smtp' => [
        'host'       => envv('MAIL_HOST', 'smtp.porkbun.com'),
        'username'   => envv('MAIL_USERNAME', 'info@swiftdesigns.studio'),
        'password'   => envv('MAIL_PASSWORD', 'ShamDawg334$'),
        'port'       => (int)envv('MAIL_PORT', 587),
        'encryption' => envv('MAIL_ENCRYPTION', PHPMailer::ENCRYPTION_STARTTLS),
        'auth'       => true
    ],
    'successMessage' => 'Message sent successfully. Thank you — I will reply soon.',
    'errorMessage'   => 'Sorry, your message could not be sent right now.',
    'rateLimit'      => (int)envv('RATE_LIMIT_SECONDS', 30)
];

// Map expected fields (form name => label)
$fields = [
    'name'    => 'Name',
    'email'   => 'Email',
    'message' => 'Message'
];

// --------------- BASIC VALIDATION ---------------
function sanitize($v) { return trim(filter_var($v, FILTER_UNSAFE_RAW, FILTER_FLAG_STRIP_LOW)); }

$data = [];
foreach ($fields as $key => $label) {
    $data[$key] = isset($_POST[$key]) ? sanitize($_POST[$key]) : '';
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request method');
}

if ($data['name'] === '' || $data['email'] === '' || $data['message'] === '') {
    respond(false, 'Please fill in all required fields.');
}

if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please provide a valid email address.');
}

// Honeypot (optional): if a hidden field is filled, treat as spam
if (!empty($_POST['website'])) {
    respond(true); // pretend success to bots
}

// Rate limit (simple): limit by IP per minute using temp file
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/contact_rate_' . md5($ip);
if (file_exists($rateFile) && (time() - filemtime($rateFile)) < $config['rateLimit']) { // cooldown
    respond(false, 'Please wait a moment before sending another message.');
}
touch($rateFile);

// --------------- BUILD EMAIL ---------------
// Build plain text body
$bodyLines = [
    'You have a new contact form submission:',
    str_repeat('=', 40)
];
foreach ($fields as $key => $label) { $bodyLines[] = $label . ': ' . $data[$key]; }
$textBody = implode("\n", $bodyLines) . "\n";

// Build HTML body (escape output)
$htmlRows = '';
foreach ($fields as $key => $label) {
    $val = htmlspecialchars($data[$key], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $htmlRows .= '<tr><th align="left" style="padding:6px 10px;background:#f5f5f5;border:1px solid #ddd;font-family:Arial,sans-serif;font-size:14px">' . $label . '</th><td style="padding:6px 10px;border:1px solid #ddd;font-family:Arial,sans-serif;font-size:14px">' . nl2br($val) . '</td></tr>';
}
$htmlBody = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Contact Form</title></head><body style="margin:0;padding:20px;background:#ffffff;font-family:Arial,sans-serif;">'
    .'<h2 style="font-weight:600;font-size:18px;margin:0 0 15px;color:#222">New Contact Form Submission</h2>'
    .'<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:600px">'
    .$htmlRows
    .'</table>'
    .'<p style="font-size:12px;color:#888;margin-top:25px">Sent from the portfolio site.</p>'
    .'</body></html>';

    // --------------- SEND EMAIL USING PHPMailer --------------- //

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if ($name === '' || $email === '' || $message === '') {
        die('All fields are required.');
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host       = getenv('MAIL_HOST');
        $mail->SMTPAuth   = true;
        $mail->Username   = getenv('MAIL_USERNAME');
        $mail->Password   = getenv('MAIL_PASSWORD');
        $mail->SMTPSecure = getenv('MAIL_ENCRYPTION');
        $mail->Port       = getenv('MAIL_PORT');

        // Sender and recipient
        $mail->setFrom(getenv('MAIL_FROM_ADDRESS'), getenv('MAIL_FROM_NAME'));
        $mail->addAddress(getenv('MAIL_TO_ADDRESS'), getenv('MAIL_TO_NAME'));
        $mail->addReplyTo($email, $name);

        // Email content
        $mail->isHTML(true);
        $mail->Subject = getenv('MAIL_SUBJECT');
        $mail->Body    = "<h3>New Contact Message from Swift Designs</h3>
                         <p><strong>Name:</strong> {$name}</p>
                         <p><strong>Email:</strong> {$email}</p>
                         <p><strong>Message:</strong><br>{$message}</p>";

        $mail->AltBody = "Name: {$name}\nEmail: {$email}\nMessage:\n{$message}";

        $mail->send();
        echo "success";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}


// --------------- RESPONSE HANDLER ---------------
function respond($success, $message = null) {
    $payload = [
        'type'    => $success ? 'success' : 'error',
        'message' => $message ?? ($success ? 'OK' : 'Error')
    ];
    $isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
    header('Content-Type: application/json');
    echo json_encode($payload);
    exit;
}
