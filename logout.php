<?php
  session_start();
  if ( !empty($_SESSION['loginid']))
  {
    session_destroy();
    header("location:index.php");
  }
?>
