<?php
    session_start();
    
    include 'conn.php';
    
    try{
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare("SELECT * FROM SitoSoftairLupiDiToscana.NoleggioASG n WHERE e.id=:id;");
		$stm->bindValue(':id',$_GET['id']);
		$stm->execute();
		if($stm->rowCount() > 0){
			$a = $stm->fetchAll();
			$stm = $dbh->prepare("DELETE FROM SitoSoftairLupiDiToscana.NoleggioUpgradeASG e WHERE e.idNoleggio=:id;DELETE FROM SitoSoftairLupiDiToscana.NoleggioASG e WHERE e.idEvento=:idEvento;DELETE FROM SitoSoftairLupiDiToscana.Partecipanti e WHERE e.idEvento=:idEvento;DELETE FROM SitoSoftairLupiDiToscana.Post e WHERE e.idEvento=:idEvento;DELETE FROM SitoSoftairLupiDiToscana.Evento e WHERE e.idEvento=:idEvento;");
			$stm->bindValue(':id',$a[0]['idNoleggio']);
			$stm->bindValue(':idEvento',$_GET['id']);
			$stm->execute();
			if($stm->errorCode() == 0){
				echo json_encode('Evento eliminato.');
			}
			else{
				echo json_encode('Errore');
			}
		}
		else if($stm->rowCount() == 0){
			$stm = $dbh->prepare("DELETE FROM SitoSoftairLupiDiToscana.NoleggioASG e WHERE e.idEvento=:idEvento;DELETE FROM SitoSoftairLupiDiToscana.Partecipanti e WHERE e.idEvento=:idEvento;DELETE FROM SitoSoftairLupiDiToscana.Post e WHERE e.idEvento=:idEvento;DELETE FROM SitoSoftairLupiDiToscana.Evento e WHERE e.idEvento=:idEvento;");
			$stm->bindValue(':id',$a[0]['idNoleggio']);
			$stm->bindValue(':idEvento',$_GET['id']);
			$stm->execute();
			if($stm->errorCode() == 0){
				echo json_encode('Evento eliminato.');
			}
			else{
				echo json_encode('Errore');
			}
		}
		else{
			echo json_encode('Errore');
		}
	}catch(PDOException $e){
		$e->getMessage();
		echo json_encode('Errore!!');
	}
?>