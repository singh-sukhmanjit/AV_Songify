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
        $songUrl = 'songs/'.$_POST["songUrl"];
        $albumArt = 'img/'.$_POST["albumArt"];
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
        <input type="text" name="songName" required=""><br>
        <label>Artist</label>
        <input type="text" name="artist" required=""><br>
        <label>Album Name</label>
        <input type="text" name="album" required=""><br>
        <label>Duration</label>
        <input type="text" name="duration" required=""><br>
        <label>Song Url</label>
        <input type="file" name="songUrl" required=""><br>
        <label>Album Art</label>
        <input type="file" name="albumArt" required=""><br>
        <input type="submit" value="Submit">
      </form>

  </body>
</html>
