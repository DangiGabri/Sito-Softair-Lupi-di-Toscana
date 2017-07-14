<?php
	session_start();

	include 'conn.php';
	
    try{
    	
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare('UPDATE SitoSoftairLupiDiToscana.Utente u SET u.Confermato=1 WHERE u.id=:id');
		$stm->bindValue(':id',$_GET['id']);
		$stm->execute();
		if($stm->errorCode() == 0){
			$stm = $dbh->prepare('INSERT INTO SitoSoftairLupiDiToscana.Statistiche (idUtente,Morti,Uccisioni,NumeroPartite,NumeroVittorie,NumeroSconfitte) VALUE (:id,0,0,0,0,0)');
			$stm->bindValue(':id',$_GET['id']);
			$stm->execute();
			if($stm->errorCode() == 0){
				header('location: https://sito-softair-lupi-di-toscana-shermangab.c9users.io/utenteConfermato.html');
			}
			else{
				echo 'Errore statistiche!';
			}
		}
		else
		{
			echo 'Errore conferma!';
		}
	}catch(PDOException $e){
		$e->getMessage();
		echo 'Errore!!';
    }
?>