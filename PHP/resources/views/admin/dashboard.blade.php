<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Admin Dashboard</title>

    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

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
      .logo-bar {
            background-color: #fff;
            /* text-align: center; */
            /* padding: 0.5rem 0; */
            padding: 1rem 0;
        }
        .logo-bar img {
            height: 25px;
            max-width: 100%;
        }
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
      /* Enhanced style for Return to Course button */
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

      .export-btn{
        margin-top: 1rem;
      }
      .btn-return:hover {
        background: linear-gradient(to right, #17a14e, #1a3159);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      }
      /* Highlight active filter button */
      .active-filter {
        opacity: 0.8;
      }
      /* Enhanced table design */
      .table-container {
        margin: 2rem auto;
      }
      .table td,
      .table th {
        vertical-align: middle;
      }
      .update-info {
        font-size: 0.85rem;
        color: #6c757d;
        margin-bottom: 0.3rem;
      }
      /* Comment History styles */
      #commentHistoryList li {
        margin-bottom: 0.5rem;
      }
      .reply-btn {
        font-size: 0.75rem;
        margin-left: 1rem;
      }

      /*comment history section*/
      .comment_history {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        text-align: left;
        background: #fff;
        padding-bottom: 5px;
      }
      .comment_history > div:first-child p {
          margin: 0;
      }
      .comment_history > div:first-child p:first-child {
          font-weight: 700;
      }
      .comment_btn_pop + .comment_btn_pop {
        margin-left: 10px;
      }
      #commentHistoryList li {
        background: #e5e5e5;
        padding: 0 0 8px 0;
      }


      /* ===========user and logout--------------- */
      
     .navb_r {
        display: flex;
        align-items: center;
      }


      .header_user_thumb {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid var(--color-olive);
        display: flex;
        position: relative;
      }
      .header_user_thumb > a {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-olive);
      }
      ul.header_menu_dropdown {
          list-style: none;
      }

      .header_menu_dropdown {
          position: absolute;
          top: 55px;
          right: 0px;
          background-color: #ffffff;
          padding: 10px 15px;
          border-radius: 5px;
          z-index: 9;
          box-shadow: 0 5px 7px rgba(0, 0, 0, .1);
          display: none;
          width: 150px;
          border: 1px solid #1da658;
      }

      .header_menu_dropdown:before {
        bottom: 100%;
        left: 86%;
        border: solid transparent;
        content: "";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-color: rgba(136, 183, 213, 0);
        border-bottom-color: #1da658;
        border-width: 7px;
          margin-left: -7px;
      }

      ul.header_menu_dropdown li + li {
          margin-top: 4px;
          border-top: 1px solid #a6d2b8;
          padding-top: 4px;
      }

      ul.header_menu_dropdown li a {
          text-decoration: none;
          color: var(--color-olive);
      }

      .openMenupanel .header_menu_dropdown{
          display: block;
      }
      /* Restrict the chart size */
      #chartContainer {
          width: 100%;
          max-width: 800px; /* Adjust width */
          margin: auto; /* Center align */
      }
      canvas {
          max-height: 300px; /* Set height */
      }
      .btn-green-gradient {
        background: linear-gradient(to right, #1b9d71, #3c7e83);
      }

        /* ===========end of user and logout--------------- */

      /* Responsive adjustments for smaller screens */
      @media (max-width: 768px) {
        .navbar-brand {
          font-size: 1.2rem;
        }
        .ms-auto {
          margin-left: auto !important;
        }
        .btn {
          margin-bottom: 0.5rem;
          display: block;
          width: 100%;
        }
      }
    </style>
  </head>

  <body>
    <!-- Logo Bar -->
    <div class="logo-bar">
      <div class="container-fluid">
        <img src="{{ asset('images/Logo.png') }}" alt="Client Logo" />
      </div>
    </div>

    <!-- Navbar with Logout, Return to Course, and Filter Buttons -->
    <nav class="navbar navbar-expand-lg navbar-gradient">
      <div class="container-fluid">
        <!-- Logout Button on the Left Corner -->
        <!-- <button onclick="location.href='login.html'" type="button" class="btn btn-outline-light me-2">
          Logout
        </button> -->
        <!-- Enhanced Return to Course button -->
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
          <ul class="navbar-nav ms-auto navb_r">
            <a href="{{ route('admin.courses') }}" class="btn btn-green-gradient me-2" style="width: 200px;">View Course</a>
            <!-- Profile Logo Button added as the last list item -->
            <li class="nav-item">
              <div class="header_user_thumb">
                <a href="#" class="header_thumb_link">
                   <svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 100 100"
                     width="40"
                     height="40"
                   >
                     <!-- Outer Circle -->
                     <circle cx="50" cy="50" r="48" fill="#1DAA58" stroke="#193661" stroke-width="2" />
                     <!-- User Head -->
                     <circle cx="50" cy="40" r="15" fill="#ffffff" />
                     <!-- User Shoulders -->
                     <path
                       d="M50 55c-15 0-22 8-22 15v5h44v-5c0-7-7-15-22-15z"
                       fill="#ffffff"
                     />
                   </svg>
                 </a>
                 <ul class="header_menu_dropdown">
                     <li><a href="{{ route('admin.userprofile') }}">User Profile</a></li>
                     <li><a href="{{ route('admin.logout') }}">Log Out</a></li>
                 </ul>
               </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>


    <!-- Cards Section -->
    <div class="container table-container">

      <div class="row">
        <div class="col-md-3">
            <div class="card text-white btn-green-gradient mb-3">
                <div class="card-body">
                    <h5 class="card-title">Total Live Courses</h5>
                    <h3>{{ number_format($liveCoursesCount) }}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card text-white btn-green-gradient mb-3">
                <div class="card-body">
                    <h5 class="card-title">Total Deleted Courses</h5>
                    <h3>{{ number_format($deletedCoursesCount) }}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card text-white btn-green-gradient mb-3">
                <div class="card-body">
                    <h5 class="card-title">Total Open Comments</h5>
                    <h3>{{ number_format($openCommentsCount) }}</h3>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card text-white btn-green-gradient mb-3">
                <div class="card-body">
                    <h5 class="card-title">Total Closed Comments</h5>
                    <h3>{{ number_format($closedCommentsCount) }}</h3>
                </div>
            </div>
        </div>
      </div>

      <!-- Chart Section -->
      <div class="card mt-4">
          <div class="card-body">
              <h5 class="card-title">Sales Overview</h5>
              <div id="chartContainer">
                <canvas id="salesChart"></canvas>
            </div>
          </div>
      </div>
    </div>


    <script src=" https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <!-- Bootstrap JS (with Popper) and Updated Script -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <script>
      $(document).ready(function () {
  
        $('.header_thumb_link').click(function(event){
            event.stopPropagation();
            //$(".header_menu_dropdown").slideToggle();
            $(this).parent().toggleClass("openMenupanel");
            
        });
  
        $(document).on('click', function (e) {
            if ($(e.target).closest(".menu_list").length === 0) {
                $(".header_thumb_link").parent().removeClass("openMenupanel");
            }
        });
      });
    </script>
    <script>
      // Chart.js Configuration
      const ctx = document.getElementById('salesChart').getContext('2d');
      const salesChart = new Chart(ctx, {
          type: 'line', // Change to 'bar' or 'pie' if needed
          data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                  label: 'Sales ($)',
                  data: [5000, 7000, 8000, 12000, 14000, 16000],
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 2,
                  fill: false
              },
              {
                  label: 'Revenue ($)',
                  data: [3000, 5000, 6000, 9000, 11000, 13000],
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 2,
                  fill: false
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
    </script>

  </body>
</html>

