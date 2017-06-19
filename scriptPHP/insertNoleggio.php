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
			$stm = $dbh->prepare("SELECT n.idNoleggio FROM SitoSoftairLupiDiToscana.NoleggioASG n WHERE n.idASG=:idASG, n.idUtente=:idUtente, n.idEvento=:idEvento;");
			$stm->bindValue(':idUtente',$_GET['idUtente']);
			$stm->bindValue(':idASG',$_GET['idASG']);
			$stm->bindValue(':idEvento',$_GET['idEvento']);
			$stm->execute();
			if($stm->errorCode() == 0){
				$a = $stm->fetchAll();
				$stm = $dbh->prepare("INSERT INTO SitoSoftairLupiDiToscana.NoleggioUpgrade (idNoleggio,idUpgradeASG) VALUE(:id,:calcio);INSERT INTO SitoSoftairLupiDiToscana.NoleggioUpgrade (idNoleggio,idUpgradeASG) VALUE(:id,:mirino);INSERT INTO SitoSoftairLupiDiToscana.NoleggioUpgrade (idNoleggio,idUpgradeASG) VALUE(:id,:caric);");
				$stm->bindValue(':caric',$_GET['caric']);
				$stm->bindValue(':mirino',$_GET['mirino']);
				$stm->bindValue(':calcio',$_GET['calcio']);
				$stm->bindValue(':id',$a['idNoleggio']);
				echo json_encode('Arma noleggiata.');
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