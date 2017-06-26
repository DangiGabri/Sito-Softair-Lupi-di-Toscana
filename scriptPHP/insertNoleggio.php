<?php
    session_start();
    
    include 'conn.php';
    
    try{
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare("INSERT INTO SitoSoftairLupiDiToscana.NoleggioASG (idASG,idEvento,idUtente) VALUE(:idASG,:idEvento,:idUtente)");
		$stm->bindValue(':idUtente',$_GET['idUtente']);
		$stm->bindValue(':idASG',$_GET['idASG']);
		$stm->bindValue(':idEvento',$_GET['idEvento']);
		$stm->execute();
		if($stm->errorCode() == 0){
			echo json_encode($_GET['idUtente']);
		}
		else{
			echo json_encode('Errore');
		}
	}catch(PDOException $e){
		$e->getMessage();
		echo json_encode('Errore!!');
	}
?>