<?php
// Connect to your database (replace with your actual database credentials)
$host = 'localhost';
$dbname = 'your_database_name';
$username = 'your_username';
$password = 'your_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $phoneNumber = $_POST['phoneNumber'];

    // Handle image upload
    $targetDir = 'uploads/';
    $targetFile = $targetDir . basename($_FILES['profileImage']['name']);
    move_uploaded_file($_FILES['profileImage']['tmp_name'], $targetFile);

    // Insert data into your users table (adjust table/column names as needed)
    $stmt = $pdo->prepare("INSERT INTO users (first_name, last_name, email, gender, phone_number, profile_image) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$firstName, $lastName, $email, $gender, $phoneNumber, $targetFile]);

    // Redirect to a success page or display a message
    header("Location: success.php");
    exit;
}
?>
