<?php
    session_start();
    
    include 'conn.php';
    
    try{
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare("INSERT INTO SitoSoftairLupiDiToscana.Partecipanti (idEvento,idUtente) VALUE(:idEvento,:idUtente)");
		$stm->bindValue(':idEvento',$_GET['idEvento']);
		$stm->bindValue(':idUtente',$_GET['idUtente']);
		$stm->execute();
		if($stm->errorCode() == 0){
			echo json_encode('Partecipante inserito.');
		}
		else{
			echo json_encode('Errore');
		}
	}catch(PDOException $e){
		$e->getMessage();
		echo json_encode('Errore!!');
	}
?>