<?php
	session_start();

	include 'conn.php';
	
	
	$_SESSION['esiste']=0;

	if($_GET['nick'] == "campi"){
		echo json_encode('Non tutti i campi sono riempiti.');
	}
	else{
	    try{
	    	
			$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
			$stm = $dbh->prepare('SELECT u.id,p.idPermesso FROM SitoSoftairLupiDiToscana.Utente u inner join SitoSoftairLupiDiToscana.Permessi p on (u.Permessi=p.idPermesso) WHERE u.Nickname=:username');
			$stm->bindValue(':username',$_GET['nick']);
			$stm->execute();
			if($stm->rowCount()>0){
				$a = $stm->fetchAll();
				$_SESSION['permesso'] = $a[0]['idPermesso'];
				$_SESSION['esiste']=$a[0]['id'];
				echo json_encode('Registrazione completata!');
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