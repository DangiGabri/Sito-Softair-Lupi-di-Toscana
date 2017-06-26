<?php
	session_start();

	include 'conn.php';
	
    try{
    	
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare('UPDATE SitoSoftairLupiDiToscana.Utente u SET Confermato=1 WHERE u.id=:id');
		$stm->execute();
		if($stm->errorCode() == 0){
			echo json_encode($stm->fetchAll());
		}
		else
		{
			echo json_encode('Errore!');
		}
	}catch(PDOException $e){
		$e->getMessage();
		echo json_encode('Errore!!');
    }
?>