<?php
$host = "localhost"; // Change if using a different host
$user = "root"; // Change based on your database user
$pass = ""; // Your database password
$dbname = "amazon_clone";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
