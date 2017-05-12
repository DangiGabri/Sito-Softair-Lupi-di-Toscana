<?php
    session_start();
    
    $_SESSION['esiste']=0;
    
    echo json_encode('Logout avvenuto.');
    
    session_destroy();
?>