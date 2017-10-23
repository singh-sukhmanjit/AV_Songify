<?php
  $host="localhost";
  $user="root";
  $pass="password";
  $db="songify";
  $conn=mysqli_connect($host,$user,$pass,$db);

  $query=$conn->query("SELECT * FROM featsong");
  $ftSongArray = array();

  while($row = mysqli_fetch_assoc($query)){

    // add each row returned into an array
    $ftSongArray[] = $row;
  }
  $json = json_encode($ftSongArray);
  echo $json;
  exit;
?>
