<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "foodflow";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$fname = $_POST['fname'];
$Oname = $_POST['Oname'];
$email = $_POST['email'];
$Mnumber = $_POST['Mnumber'];
$password = $_POST['password'];

$sql = "INSERT INTO supplier (FullName,OrgName, Email,Mnumber ,Password) 
VALUES ('$fname','$Oname','$email','$Mnumber', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "Registration successful!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>