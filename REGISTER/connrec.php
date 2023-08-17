<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "foodflow";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$flname = $_POST['fname'];
$OHname = $_POST['OHname'];
$mail = $_POST['mail'];
$Mnumber = $_POST['Mnumber'];
$password = $_POST['password'];

$sql = "INSERT INTO receiver (FullName, Orphanage, Email, Mnumber ,Password) 
VALUES ('$flname','$OHname','$mail','$Mnumber', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "Registration successful!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>