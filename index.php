<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title> Song App</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="font-awesome.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css">
    <link rel="stylesheet" type="text/css" href="main.css">
</head>

<body>
  <?php
    $host="localhost";
    $user="root";
    $pass="password";
    $db="songify";
    $conn=mysqli_connect($host,$user,$pass,$db);

    $name = $artist = $album = $duration = $songUrl = $albumArt = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
      $name = $_POST["name"];
      $artist = $_POST["artist"];
      $album = $_POST["album"];
      $duration = $_POST["duration"];
      $fileName = 'songs/'.$_POST["fileName"];
      $albumArt = 'img/'.$_POST["albumArt"];
      $query=$conn->query("INSERT INTO `usersongs` (`name`,`artist`,`album`,`duration`,`fileName`,`albumArt`) VALUES ('$name','$artist','$album','$duration','$fileName','$albumArt')");
      if($query)
      {
        header("location:index.php");
      }
      else
      {
        echo "no";
        echo mysqli_error("$conn");

      }
    }

  ?>

  <?php
    session_start();
    if ( empty($_SESSION['loginid']))
    {
      header("location:login.php");
    }
  ?>


    <div class="wrapper">
        <section class="welcome-screen hidden">
            <h1> Welcome to Songify </h1>
            <h3> Enter name to access your account </h3>
            <div class="input-wrapper" method="post">
                <input type="text" placeholder="Name" id="name-input"><br>
                <input type="text" placeholder="test@acadview.com" id="email-input"><br>
                <input type="password" placeholder="JavascriptRocks" id="pwd-input"><br>
                <button> Go </button>
                <p></p>

            </div>

        </section>

        <div id="playList" class="">
            <ul id="songList">
                <li><i class="fa fa-music fa-3x" aria-hidden="true"></i></li><hr>
                <li id="songList1">Home</li>
                <li id="songList2">Your Music</li>
                <li><a data-toggle="modal" data-target="#myModal">Add Songs</a></li>
                <li><hr>
                  <?php
                    echo $_SESSION['fname'].' '.$_SESSION['lname'];
                  ?>
                </li>
                <li><a href="logout.php">Log Out</a></li>
            </ul>
        </div>
        <!-- Button trigger modal -->


        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Add Songs</h4>
              </div>
              <div class="modal-body">
                <form name="addSong" class="form-horizontal" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
                  <div class="form-group">
                    <div class="col-sm-12">
                      <input name="name" type="text" class="form-control" placeholder="Song Name" required="">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <input name="artist" type="text" class="form-control" placeholder="Artist Name" required="">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <input name="album" type="text" class="form-control" placeholder="Album Name" required="">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <input name="duration" type="text" class="form-control" placeholder="Duration" required="">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-4">
                      <label for="urlFile" class="form-control">Select Song</label>
                    </div>
                    <div class="col-sm-8">
                      <input id="urlFile" name="fileName" type="file" class="form-control" required="">
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="col-sm-4">
                      <label for="albumFile" class="form-control">Select Album Art</label>
                    </div>
                    <div class="col-sm-8">
                      <input id="albumFile" name="albumArt" type="file" class="form-control" required="">
                    </div>
                  </div>
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="submit" class="btn btn-primary">Add Song</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="main">
          <div class="header">
            <h2>Featured
              <span id="bgColors">
              <div class="theme1 theme"></div>
              <div class="theme2 theme"></div>
              <div class="theme3 theme"></div>
            </span></h2><hr>

            <div class="featWrapper">

            </div>
          </div>

            <section class="content">
                <audio></audio>

                <table id="songs" class="hidden">
                    <thead class="list-headers">
                        <tr>
                            <td> Sr. </td>
                            <td> Title </td>
                            <td> Artist </td>
                            <td> Album </td>
                            <td> Duration </td>
                        </tr>
                    </thead>
                    <tbody class="song-list">


                    </tbody>
                </table>





            </section>
            <footer>
              <div class="current-song-wrapper">
              <img src="img/coldplay.jpg" class="current-song-image">
              <div>
              <p class="current-song-name"></p>
              <p class="current-song-album"></p>
              </div>
              </div>
                <div class="controls">
                    <div class="player-buttons">

                      <span class="volume glyphicon glyphicon-volume-up"></span>
                      <div id="vol_slider">
                          <div id="vol_filled"></div>
                      </div>
                      <i class="fa fa-random clickable disabled" aria-hidden="true"></i>
                      <i class="fa fa-step-backward clickable" aria-hidden="true"></i>
                      <i class="fa fa-play clickable play-icon" aria-hidden="true"></i>
                      <i class="fa fa-step-forward clickable" aria-hidden="true"></i>
                      <i class="fa fa-repeat disabled clickable" aria-hidden="true"></i>
                      <a href="piano.html" id="inst">PIANO</a>
                    </div>

                    <div class="progress-wrapper">
                        <span class="time-elapsed"> </span>
                        <div class="player-progress">
                            <div class="progress-filled"> </div>
                        </div>
                        <span class="song-duration"></span>
                    </div>
                </div>
            </footer>
        </div>

    </div>
    <script src="jquery-3.2.1.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
    <script src="main.js"></script>
</body>

</html>
