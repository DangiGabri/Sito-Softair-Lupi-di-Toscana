<?php
    session_start();

    include 'conn.php';
    
    try{
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare('SELECT u.Nickname,s.*,(s.Uccisioni/s.Morti) as KDRatio,(s.NumeroVittorie/s.NumeroPartite) as NVittorie FROM SitoSoftairLupiDiToscana.Statistiche s inner join SitoSoftairLupiDiToscana.Utente u on (u.id=s.idUtente) WHERE s.idUtente=:id');
		$stm->bindValue(':id',$_GET['id']);
		$stm->execute();
		if($stm->rowCount()>0){
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