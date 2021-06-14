<?php
$base_url ='http://localhost/index.php';
if(isset($_POST['btn_submit']))
{
$name=$_POST['txt_name'];
$message=$_POST['txt_message'];
$handle=fopen("comment.php","a");
fwrite($handle,"<pre><i class='fa fa-user'></i><b><i>".$name."</i><b><br><p>".$message."</p></pre><br>");
fclose($handle);


}

?>


<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Untitled Document</title>
	<script src="<?php echo $base_url; ?>/jquery-3.5.1.min.js"></script>
	<link href="<?php echo $base_url; ?>/style/bulma-0.7.4/css/bilma.css" rel="stylesheet" type="text/css">
    <link href="<?php echo $base_url; ?>/style/bulma-0.7.4/css/bilma.css" rel="stylesheet" type="text/css">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/fontawesome.min.css">
	
</head>

<body>
      <section class="hero is-full-height is-success">
	<div class="container">
		  <div class="box">
	         <form method="post">
			  <h1 class="title has-text-centerd">
				 Php comment system without php
				 </h1>
			  <div class="column">
				 <label class="name">Name</label>
				 <input type="text" class="input is-full is-large" name="txt_name" required>
				 </div>
			  <div class="column">
				 <label class="message">Message</label>
				 <textarea  class="textarea is-full is-large" name="txt_name" name="txt_message" cols="10" rows="4">
				  </textarea>
				  
				 </div>
			  <div class="column">
				 <input type="submit" class="button is-full is-large" name="btn_submit" value="submit">
				 </div>
			  </form>
		<?php include "comment.php"; 
			  ?>
		</div>
		  </div>
	</section>
	
</body>
</html>