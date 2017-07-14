<?php
    session_start();
    
    $_SESSION['esiste']=0;
    
    include 'conn.php';
    include 'checkEmail.php';
    
    if(chkEmail($_GET['email'])) {
    	if($_GET['nick']!="" && $_GET['pass']!="" && $_GET['nome']!="" && $_GET['cognome']!="" && $_GET['email']!=""){
		    try{
				$dbh = new PDO('mysql:host='.$host.';dbname='.$dbNome,$username,$password);
				$stm = $dbh->prepare("SELECT * FROM SitoSoftairLupiDiToscana.Utente u WHERE u.Nickname=:username");
				$stm->bindValue(':username',$_GET['nick']);
				$stm->execute();
				if($stm->rowCount()>0){
					echo json_encode('Username gia presente.');
				}
				else{
					$stm = $dbh->prepare("INSERT INTO SitoSoftairLupiDiToscana.Utente (Nickname,Password,Nome,Cognome,Email,Ruolo,Permessi,Confermato) VALUE(:username,:password,:nome,:cognome,:email,10,4,0)");
					$stm->bindValue(':username',$_GET['nick']);
					$stm->bindValue(':password',$_GET['pass']);
					$stm->bindValue(':nome',$_GET['nome']);
					$stm->bindValue(':cognome',$_GET['cognome']);
					$stm->bindValue(':email',$_GET['email']);
					if($stm->execute() == true){
						echo json_encode('OK');
					}
					else{
						echo json_encode('Errore nei dati.');
					}
				}
			}catch(PDOException $e){
				$e->getMessage();
				echo json_encode('Errore!!');
			}
	    }
	    else{
	    	echo json_encode('campi');
	    }
    }
    else {
    	echo 'Indirizzo email errato';
    }
?>