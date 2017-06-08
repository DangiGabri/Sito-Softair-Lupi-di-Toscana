<?php
    session_start();
    if($_GET['mese']=='January,')
        echo json_encode('01');
    else if($_GET['mese']=='February,')
        echo json_encode('02');
    else if($_GET['mese']=='March,')
        echo json_encode('03');
    else if($_GET['mese']=='April,')
        echo json_encode('04');
    else if($_GET['mese']=='May,')
        echo json_encode('05');
    else if($_GET['mese']=='June,')
        echo json_encode('06');
    else if($_GET['mese']=='July,')
        echo json_encode('07');
    else if($_GET['mese']=='August,')
        echo json_encode('08');
    else if($_GET['mese']=='September,')
        echo json_encode('09');
    else if($_GET['mese']=='October,')
        echo json_encode('10');
    else if($_GET['mese']=='November,')
        echo json_encode('11');
    else if($_GET['mese']=='December,')
        echo json_encode('12');
?>