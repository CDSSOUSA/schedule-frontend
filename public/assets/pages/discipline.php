<?php

use App\Libraries\GenerateToken;
use Config\Services;

echo $this->extend('layout/default');
echo $this->section('content');


?> 

  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <!-- Navbar -->
    <?php //include('breadcrumb.html'); ?>
    <div class="container-fluid py-4">
      <?php include('discipline/menu-widget.html'); ?>
      <?php include('discipline/content.html'); ?>
      <div class="row my-4"></div>
      <?php include('footer.html'); ?>
    </div>
  </main>

  <?php //include('config.html'); 
  ?>

  <?php //include('schedule/modal/add.html'); ?>
  <?php include('discipline/modal/delete.html'); ?>
  <?php include('discipline/modal/edit.html'); ?>
  <?php //include('schedule/modal/list-series.html'); ?>
  
  <?= $this->endSection(); 

  echo $this->section('script-js'); ?>

  <script src="../public/assets/js/discipline.js"></script>

  <?= $this->endSection();