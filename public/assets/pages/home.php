<?php
echo $this->extend('layout/default');
echo $this->section('content');




?>

<main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  <!-- Navbar -->
  <?php //include('breadcrumb.html'); 
  ?>
  <div class="container-fluid py-4">
    <?php //include('series/menu-widget.html'); 
    ?>
    <?php include('home/content.html'); ?>
    <div class="row my-4"></div>
    <?php //include('footer.html'); 
    ?>
  </div>
</main>


<?php //include('config.html'); 
?>

<?php //include('series/modal/edit.html'); 
?>
<?php //include('series/modal/delete.html'); 
?>
<?php //include('series/modal/add.html'); 
?>
<?php //include('series/modal/delete.html'); 
?>
<?php //include('series/modal/list-series.html'); 
?>

<?= $this->endSection();

echo $this->section('script-js'); ?>

<script src="../public/assets/js/home.js"></script>

<?= $this->endSection();
