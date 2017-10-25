<?php
  $host="localhost";
  $user="root";
  $pass="password";
  $db="songify";
  $conn=mysqli_connect($host,$user,$pass,$db);

  $query=$conn->query("SELECT * FROM usersongs");
  $listSongArray = array();

  while($row = mysqli_fetch_assoc($query)){

    // add each row returned into an array
    $listSongArray[] = $row;
  }
  $json = json_encode($listSongArray);
  echo $json;
  exit;
?>
