<?php
	session_start();

	include 'conn.php';
	
	
	$_SESSION['esiste']=0;

	if($_SESSION['esiste']==0){
	    try{
	    	
			$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
			$stm = $dbh->prepare('SELECT p.id FROM SitoSoftairLupiDiToscana.Utente u inner join SitoSoftairLupiDiToscana.Permessi p on (u.Permessi=p.id) WHERE u.Password=:password and u.Nickname=:username');
			$stm->bindValue(':username',$_GET['nick']);
			$stm->bindValue(':password',$_GET['pass']);
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