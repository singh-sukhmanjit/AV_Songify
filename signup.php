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
      $host="localhost";
      $user="root";
      $pass="password";
      $db="songify";
      $conn=mysqli_connect($host,$user,$pass,$db);

      $fname = $lname = $email = $password = "";

      if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $fname = $_POST["fname"];
        $lname = $_POST["lname"];
        $email = $_POST["email"];
        $password = $_POST["password"];
        $query=$conn->query("INSERT INTO `users` (`fname`,`lname`,`email`,`password`) VALUES ('$fname','$lname','$email','$password')");
        if($query)
      	{
      		header("location:index.html");
      	}
      	else
      	{
      		echo "no";
      		echo mysqli_error("$conn");

      	}
      }
    ?>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12" id="mainHeader">
          <h3>Spotify</h3>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 col-md-offset-4" id="loginForm">
          <p class="btnHeading btn">Sign Up</p>
          <form name="signup" class="form-horizontal loginForm" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <div class="form-group">
              <div class="col-sm-12">
                <input name="fname" type="text" class="form-control" placeholder="First Name" required="" ng-model="fname">
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12">
                <input name="lname" type="text" class="form-control" placeholder="Last Name" ng-model="lname">
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12">
                <input name="email" type="email" class="form-control" placeholder="email address" required="" ng-model="email">
                <div ng-show="signup.email.$error.email">Enter a valid email </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-12">
                <input name="password" type="password" class="form-control" placeholder="Password" required="" ng-model="password" ng-minlength="8" ng-maxlength="16">
                <div ng-show="signup.password.$error.minlength">Minimum length should be 8</div>
                <div ng-show="signup.password.$error.maxlength">Maximum length should be 16</div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-4 col-sm-offset-4">
                <button type="submit" class="btn btn-success" ng-disabled="signup.$invalid">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Jquery, Bootstrap, MainJs Script files -->
    <script src="jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
