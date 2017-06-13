<?php
	session_start();

	include 'conn.php';
	
    try{
    	
		$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
		$stm = $dbh->prepare('SELECT count(*) as nASG FROM SitoSoftairLupiDiToscana.ASG a WHERE a.idProprietario=:id');
		$stm->bindValue(':id',$_GET['id']);
		$stm->execute();
		$a = $stm->fetchAll();
		if($a[0]['nASG']==0){
			echo json_encode('show');
		}
		elseif($a[0]['nASG']>0){
			echo json_encode('hide');
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