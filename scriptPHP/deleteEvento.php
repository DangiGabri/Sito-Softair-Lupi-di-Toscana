<?php
    session_start();
    
    include 'conn.php';
    
    try{
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare("DELETE FROM SitoSoftairLupiDiToscana.Evento WHERE id=:id");
		$stm->bindValue(':id',$_GET['id']);
		$stm->execute();
		if($stm->errorCode() == 0){
			echo json_encode('Evento eliminato.');
		}
		else{
			echo json_encode('Errore');
		}
	}catch(PDOException $e){
		$e->getMessage();
		echo json_encode('Errore!!');
	}
?>