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
      $songUrl = $_POST["fileName"];
      $albumArt = $_POST["albumArt"];
      $query=$conn->query("INSERT INTO `usersongs` (`name`,`artist`,`album`,`duration`,`fileName`,`albumArt`) VALUES ('$name','$artist','$album','$duration','$songUrl','$albumArt')");
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
                <li>Logo</li><hr>
                <li id="songList1">Home</li>
                <li id="songList2">Your Music</li>
                <li><a data-toggle="modal" data-target="#myModal">Add Songs</a></li>
                <li><hr>Sukhman Sandhu</li>
            </ul>
        </div>
        <!-- Button trigger modal -->


        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Modal title</h4>
              </div>
              <div class="modal-body">
                <form name="addSong" class="form-horizontal" method="POST" action="">
                  <div class="form-group">
                    <div class="col-sm-12">
                      <input name="name" type="text" class="form-control" placeholder="Song Name">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <input name="artist" type="text" class="form-control" placeholder="Artist Name">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <input name="album" type="text" class="form-control" placeholder="Album Name">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <input name="duration" type="text" class="form-control" placeholder="Duration">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <input id="urlFile" name="fileName" type="file" class="form-control">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                      <input name="albumArt" type="text" class="form-control" placeholder="Album Art Url">
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" form="addSong" class="btn btn-primary" value="Save Changes">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
        <div class="main">
          <div class="header">
            <h2>Featured</h2><hr>
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
