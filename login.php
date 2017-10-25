<!DOCTYPE html>
<html lang="en" ng-app>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Songify</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/font-awesome.css">
    <link href="main.css" rel="stylesheet">
    <script src="js/angular.min.js"></script>

  </head>

  <body>
    <?php
      session_start();
      $host="localhost";
      $user="root";
      $pass="password";
      $db="songify";
      $conn=mysqli_connect($host,$user,$pass,$db);
      if ($_SERVER["REQUEST_METHOD"] == "POST")
      {
      	$email=$_REQUEST["email"];
      	$password=$_REQUEST["password"];
      	$query=$conn->query("SELECT * FROM `users` WHERE `email`='$email' && `password`='$password'");
      	$fetch=mysqli_fetch_assoc($query);
        if($fetch)
      	{

      		$_SESSION['loginid']=$email;
          $_SESSION['fname']=$fetch["fname"];
          $_SESSION['lname']=$fetch["lname"];
      		header("location:index.php");
      	}
      	else
      	{
      		echo "<script>
      			alert('Wrong id and password');

      		</script>";
      	}

      }
    ?>

    <?php
      if ( !empty($_SESSION['loginid']))
      {
        header("location:index.php");
      }
    ?>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12" id="mainHeader">
          <h3>Songify</h3>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 col-md-offset-4" id="loginForm">
          <p class="btnHeading btn">Log In</p>
          <form name="login" class="form-horizontal" class="loginForm" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <div class="form-group">
              <div class="col-sm-12">
                <input name="email" type="email" class="form-control" placeholder="email address" ng-model="email">
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12">
                <input name="password" type="password" class="form-control" placeholder="Password">
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-6 col-sm-offset-3">
                <button type="submit" class="btn btn-success">Sign in</button>
              </div>
            </div>
          </form>
          <p class="pEdit">Don't have an account? <a href="#" class="text-success">Sign Up</a></p>
        </div>
      </div>
    </div>

    <!-- Jquery, Bootstrap, MainJs Script files -->
    <script src="jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
