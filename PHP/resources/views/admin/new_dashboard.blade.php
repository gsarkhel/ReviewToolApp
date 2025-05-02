<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enhanced Admin Dashboard</title>

    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    />
    <!-- Font Awesome for icons -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      integrity="sha512-Fo3rlrZj/k7ujTnHq6S9KMOoVL1D+qq3+tQk2FJ8eB4eD3s3/sRJY5qBWe8erDq1Oe3Z4KqXqedh5yZ4ZW2gYA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <!-- Animate.css for animations -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />

    <style>
      @font-face {
        font-family: "Proxima Nova";
        src: url("fonts/proximanova.woff2") format("woff2"),
          url("fonts/proximanova.woff") format("woff"),
          url("fonts/proximanova.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      * {
        font-family: "Proxima Nova", sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body.dark-mode {
        background-color: #121212;
        color: #e0e0e0;
      }
      /* Sidebar styles */
      #sidebar {
        height: 100vh;
        width: 250px;
        position: fixed;
        top: 0;
        left: 0;
        background: linear-gradient(to right, #1DAA58, #193661);
        padding-top: 60px;
        transition: all 0.3s;
      }
      #sidebar a {
        padding: 15px 20px;
        text-decoration: none;
        font-size: 1rem;
        color: #dcdee4;
        display: block;
      }
      #sidebar a:hover {
        background: #1DAA58;
        color: #fff;
      }
      /* Main content with sidebar spacing */
      #content {
        margin-left: 250px;
        padding: 20px;
        transition: margin-left 0.3s;
      }
      /* Top Navbar adjustments */
      .navbar-gradient {
        background: linear-gradient(to right, #1DAA58, #193661);
      }
      .navbar-gradient .nav-link,
      .navbar-gradient .navbar-toggler-icon,
      .navbar-gradient .btn {
        color: #fff !important;
      }
      .navbar-brand {
        color: #dcdee4 !important;
      }
      .btn-green-gradient {
        background: linear-gradient(to right, #1b9d71, #3c7e83);
        color: #fff !important;
        border: none;
      }
      /* Return to Course button */
      .btn-return {
        background: linear-gradient(to right, #09694c, #32ad9a);
        color: #fff !important;
        border: none;
        padding: 0.5rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 0.4rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        transition: background 0.3s ease, box-shadow 0.3s ease;
      }
      .btn-return:hover {
        background: linear-gradient(to right, #17a14e, #1a3159);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      }
      /* Cards Section */
      .table-container {
        margin: 2rem auto;
      }
      .card {
        transition: transform 0.3s ease;
      }
      .card:hover {
        transform: translateY(-5px);
      }
      /* Chart container */
      #chartContainer {
        width: 100%;
        max-width: 800px;
        margin: auto;
      }
      canvas {
        max-height: 300px;
      }
      /* Dark mode specific styles */
      body.dark-mode .card {
        background-color: #1e1e1e;
        border-color: #333;
      }
      body.dark-mode #sidebar {
        background: #121212;
      }
    </style>
  </head>
  <body>
    <!-- Sidebar Navigation -->
    <div id="sidebar">
      <a href="#"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
      <a href="#"><i class="fas fa-book"></i> Courses</a>
      <a href="#"><i class="fas fa-comments"></i> Comments</a>
      <a href="#"><i class="fas fa-chart-line"></i> Analytics</a>
      <a href="#"><i class="fas fa-cog"></i> Settings</a>
      <a href="#" id="darkModeToggle"><i class="fas fa-moon"></i> Toggle Dark Mode</a>
    </div>

    <!-- Main Content -->
    <div id="content">
      <!-- Top Navbar -->
      <nav class="navbar navbar-expand-lg navbar-gradient mb-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Dashboard</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto align-items-center">
              <li class="nav-item">
                <a href="#" class="btn btn-green-gradient me-2">View Course</a>
              </li>
              <li class="nav-item">
                <!-- Profile dropdown -->
                <div class="header_user_thumb position-relative">
                  <a href="#" class="header_thumb_link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      width="40"
                      height="40"
                    >
                      <circle cx="50" cy="50" r="48" fill="#1DAA58" stroke="#193661" stroke-width="2" />
                      <circle cx="50" cy="40" r="15" fill="#ffffff" />
                      <path d="M50 55c-15 0-22 8-22 15v5h44v-5c0-7-7-15-22-15z" fill="#ffffff" />
                    </svg>
                  </a>
                  <ul class="header_menu_dropdown list-unstyled position-absolute bg-white p-2 rounded shadow" style="top:55px; right:0; display:none; width:150px; border: 1px solid #1da658;">
                    <li><a href="#">User Profile</a></li>
                    <li><a href="#">Log Out</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Cards Section -->
      <div class="container table-container">
        <div class="row g-3">
          <div class="col-md-3">
            <div class="card text-white btn-green-gradient animate__animated animate__fadeInUp">
              <div class="card-body">
                <h5 class="card-title">Total Live Courses</h5>
                <h3>{{ number_format($liveCoursesCount) }}</h3>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-white btn-green-gradient animate__animated animate__fadeInUp" style="animation-delay: 0.1s;">
              <div class="card-body">
                <h5 class="card-title">Total Deleted Courses</h5>
                <h3>{{ number_format($deletedCoursesCount) }}</h3>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-white btn-green-gradient animate__animated animate__fadeInUp" style="animation-delay: 0.2s;">
              <div class="card-body">
                <h5 class="card-title">Total Open Comments</h5>
                <h3>{{ number_format($openCommentsCount) }}</h3>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card text-white btn-green-gradient animate__animated animate__fadeInUp" style="animation-delay: 0.3s;">
              <div class="card-body">
                <h5 class="card-title">Total Closed Comments</h5>
                <h3>{{ number_format($closedCommentsCount) }}</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Chart Section -->
        <div class="card mt-4 animate__animated animate__fadeInUp">
          <div class="card-body">
            <h5 class="card-title">Sales Overview</h5>
            <div id="chartContainer">
              <canvas id="salesChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- jQuery and Bootstrap Bundle with Popper -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
      // Toggle Profile Dropdown
      $(document).ready(function () {
        $('.header_thumb_link').click(function (event) {
          event.stopPropagation();
          $(this).siblings('.header_menu_dropdown').slideToggle();
        });
        $(document).on('click', function () {
          $('.header_menu_dropdown').slideUp();
        });
      });

      // Dark mode toggle functionality
      document.getElementById('darkModeToggle').addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        // Toggle icon between moon and sun
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
        } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
        }
      });

      // Chart.js Configuration
      const ctx = document.getElementById('salesChart').getContext('2d');
      const salesChart = new Chart(ctx, {
        type: 'line', // Change type if desired
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Sales ($)',
              data: [5000, 7000, 8000, 12000, 14000, 16000],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Revenue ($)',
              data: [3000, 5000, 6000, 9000, 11000, 13000],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    </script>
  </body>
</html>