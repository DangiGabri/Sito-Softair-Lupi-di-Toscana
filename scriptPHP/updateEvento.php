<?php
	session_start();

	include 'conn.php';
	
	
	$_SESSION['esiste']=0;

	if($_SESSION['esiste']==0){
	    try{
	    	
			$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
			$stm = $dbh->prepare('UPDATE FROM SitoSoftairLupiDiToscana.Evento e inner join SitoSoftairLupiDiToscana.Campo c on (c.id=e.idCampo) VALUES');
			$stm->bindValue(':username',$_GET['nome']);
			$stm->bindValue(':data',$_GET['data']);
			$stm->bindValue(':desc',$_GET['descrizione']);
			$stm->bindValue(':id',$_GET['id']);
			$stm->execute();
			if($stm->rowCount()>0){
				$a = $stm->fetchAll();
				$_SESSION['permesso'] = $a[0]['id'];
				$_SESSION['esiste']=1;
				echo json_encode('Sei loggato.');
    		}
    		else
    		{
    			echo json_encode('Username o password non valido.');
    		}
		}catch(PDOException $e){
			$e->getMessage();
			echo json_encode('Errore!!');
		}
    }
?>