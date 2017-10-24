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
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12" id="mainHeader">
          <h3>Spotify</h3>
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
              <div class="col-sm-6">
                <div class="checkbox">
                  <label id="check">
                    <input type="checkbox" id="check"> Remember me
                  </label>
                </div>
              </div>
              <div class="col-sm-6">
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
