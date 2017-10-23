<html>
  <head>
    <title>Admin</title>
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
        $name = $_POST["songName"];
        $artist = $_POST["artist"];
        $album = $_POST["album"];
        $duration = $_POST["duration"];
        $songUrl = $_POST["songUrl"];
        $albumArt = $_POST["albumArt"];
        $query=$conn->query("INSERT INTO `featsong` (`name`,`artist`,`album`,`duration`,`fileName`,`albumArt`) VALUES ('$name','$artist','$album','$duration','$songUrl','$albumArt')");
        if($query)
      	{
      		header("location:admin.php");
      	}
      	else
      	{
      		echo "no";
      		echo mysqli_error("$conn");

      	}
      }

    ?>

      <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
        <label>Song Name</label>
        <input type="text" name="songName"><br>
        <label>Artist</label>
        <input type="text" name="artist"><br>
        <label>Album Name</label>
        <input type="text" name="album"><br>
        <label>Duration</label>
        <input type="text" name="duration"><br>
        <label>Song Url</label>
        <input type="text" name="songUrl"><br>
        <label>Album Art</label>
        <input type="text" name="albumArt"><br>
        <input type="submit" value="Submit">
      </form>

  </body>
</html>
