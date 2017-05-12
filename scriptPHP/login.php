<?php
	session_start();

	include 'conn.php';
	
	
	$_SESSION['esiste']=0;

	if($_SESSION['esiste']==0){
	    try{
	    	
			$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
			$stm = $dbh->prepare('SELECT * FROM SitoSoftairLupiDiToscana.Utente WHERE Password=:password and Nickname=:username');
			$stm->bindValue(':username',$_GET['nick']);
			$stm->bindValue(':password',$_GET['pass']);
			$stm->execute();
			if($stm->rowCount()>0){
				$_SESSION['esiste']=1;
				echo json_encode('Sei loggato.');
    		}
    		else
    		{
    			echo json_encode('Username o password non valido.');
    		}
		}catch(PDOException $e){
			$e->getMessage();
			echo json_encode('Errore!!');
		}
    }
?>