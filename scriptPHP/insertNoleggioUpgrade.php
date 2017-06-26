<?php
    session_start();
    
    include 'conn.php';
    
    try{
    	$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare("SELECT n.idNoleggio FROM SitoSoftairLupiDiToscana.NoleggioASG n WHERE n.idASG=:idASG AND n.idUtente=:idUtente AND n.idEvento=:idEvento;");
		$stm->bindValue(':idUtente',$_GET['idUtente']);
		$stm->bindValue(':idASG',$_GET['idASG']);
		$stm->bindValue(':idEvento',$_GET['idEvento']);
		$stm->execute();
		if($stm->errorCode() == 0){
			$a = $stm->fetchAll();
			$stm = $dbh->prepare("INSERT INTO SitoSoftairLupiDiToscana.NoleggioUpgrade (idNoleggio,idUpgradeASG) VALUE(:id,:calcio)");
			$stm->bindValue(':caric',$_GET['caric']);
			$stm->bindValue(':mirino',$_GET['mirino']);
			$stm->bindValue(':calcio',$_GET['calcio']);
			$stm->bindValue(':id',$a[0]['idNoleggio']);
			if($stm->errorCode() == 0){
				echo json_encode('Arma inserita.');
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