<?php

echo $this->extend('layout/default');
echo $this->section('content');

?> 

  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <!-- Navbar -->
    <?php //include('breadcrumb.html'); ?>
    <div class="container-fluid py-4">
      <?php include('menu-widget.html'); ?>
      <?php include('content.html'); ?>
      <div class="row my-4"></div>
      <?php include('../public/assets/pages/footer.html'); ?>
    </div>
  </main>

  <?php //include('config.html'); 
  ?>

  <?php //include('schedule/modal/add.html'); ?>
  <?php include('modal/delete.html'); ?>
  <?php include('modal/edit.html'); ?>
  <?php //include('schedule/modal/list-series.html'); ?>
  
  <?= $this->endSection(); 

  echo $this->section('script-js'); ?>

  <script src="../public/assets/js/discipline.js"></script>

  <?= $this->endSection();