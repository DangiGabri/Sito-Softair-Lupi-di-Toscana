<?php
	session_start();

	include 'conn.php';
	
    try{
    	
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare('UPDATE SitoSoftairLupiDiToscana.Notizia e SET Titolo=:nome, Contenuto=:desc WHERE e.idNotizia=:id');
		$stm->bindValue(':nome',$_GET['nome']);
		$stm->bindValue(':desc',$_GET['descrizione']);
		$stm->bindValue(':id',$_GET['id']);
		$stm->execute();
		if($stm->errorCode() == 0){
			echo json_encode('Notizia modificata.');
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