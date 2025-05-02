<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Profile</title>

    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    />
    <!-- Bootstrap Icons -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
    />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

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
      /* Logo Bar */
      .logo-bar {
        background-color: #fff;
        /* text-align: center; */
        /* padding: 0.5rem 0; */
        padding: 1rem 0;
      }
      .logo-bar img {
        height: 36px;
        max-width: 100%;
      }
      /* Navbar styling based on brand guidelines */
      .navbar-gradient {
        background: linear-gradient(to right, #1DAA58, #193661);
      }
      .navbar-gradient .navbar-brand,
      .navbar-gradient .btn {
        color: #fff !important;
      }
      /* Use flex container for navbar with space-between */
      .navbar-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
      /* Green gradient button style for Save Changes */
      .btn-green-gradient {
        background: linear-gradient(to right, #1DAA58, #193661);
        border: none;
        color: #fff !important;
      }
      /* Main Profile Container */
      .profile-container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 1.5rem;
        border: 1px solid #ddd;
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .profile-details h5 {
        font-weight: 600;
      }
      .profile-details p {
        margin-bottom: 0.75rem;
      }
      .custom-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1050;
        width: 300px; /* Make it smaller */
        padding: 10px;
        font-size: 14px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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

    <!-- Navbar with Back button (left), title (center), and Edit Profile button (right) -->
    <nav class="navbar navbar-expand-lg navbar-gradient">
      <div class="container-fluid navbar-flex">

        <a href="{{ url()->previous() }}" class="btn btn-secondary btn-sm me-2">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </a>
        <!-- Centered Title -->
        <span class="navbar-brand">User Profile</span>
        <div style="width: 140px;"></div>

      </div>
    </nav>

    @if(session('success'))
        <div class="alert alert-success fade show custom-alert" role="alert">
            {{ session('success') }}
        </div>
    @endif

    @if(session('error'))
        <div class="alert alert-danger fade show custom-alert" role="alert">
            {{ session('error') }}
        </div>
    @endif

    @if($errors->any())
        <div class="alert alert-danger fade show custom-alert" role="alert">
            <ul>
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <!-- Main Body - Profile Details -->
    <div class="container profile-container">
        <div class="profile-details">
            <h5>Name:</h5>
            <p id="displayName">{{ $user->name }}</p>
    
            <h5>Email:</h5>
            <p id="displayEmail">{{ $user->email }}</p>
    
            <h5>Role:</h5>
            <p id="displayRole">{{ ucfirst($user->role) }}</p>
        </div>
    </div>

    <div class="container profile-container">
        <!-- Change Password Section -->
        <div class="change-password-form mt-4">
            <h4>Change Password</h4>
            <div class="alert alert-warning p-2" role="alert">
              <strong>Note:</strong> After successfully changing your password, you will be logged out.
            </div>
            <form id="editProfileForm" method="POST" action="{{ route('admin.profile.update') }}">
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label for="currentPassword" class="form-label">Current Password</label>
                    <input type="password" class="form-control" id="currentPassword" name="current_password" required>
                </div>

                <div class="mb-3">
                    <label for="newPassword" class="form-label">New Password</label>
                    <input type="password" class="form-control" id="newPassword" name="new_password" required>
                </div>

                <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="confirmPassword" name="new_password_confirmation" required>
                </div>

                <button type="submit" class="btn btn-green-gradient" id="saveProfileBtn">Save Changes</button>
            </form>
        </div>
    </div>

    <!-- Bootstrap JS (with Popper) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      // Update password details and close modal when Save Changes is clicked
      document.getElementById("saveProfileBtn").addEventListener("click", function () {
        const currentPassword = document.getElementById("currentPassword").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Validate that no fields are empty
        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("All fields are required.");
            return;
        }

        // Validate that new password and current password does not match
        if (newPassword == currentPassword) {
            alert("New password and current password should not be same.");
            return;
        }

        // Validate that new password and confirm password match
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password must match.");
            return;
        }

        // If validation passes, submit the form
        document.getElementById("editProfileForm").submit();

        // Close the modal
        const editProfileModal = bootstrap.Modal.getInstance(document.getElementById("editProfileModal"));
        editProfileModal.hide();
      });
    </script>

    {{-- Auto-hide alert after a few seconds --}}
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            setTimeout(function () {
                let alerts = document.querySelectorAll(".custom-alert");
                alerts.forEach(alert => {
                    alert.classList.add("fade");
                    setTimeout(() => {
                        alert.remove(); // Remove the alert completely
                    }, 500); // Delay before removing (to allow fading effect)
                });
            }, 3000); // Alert disappears after 3 seconds
        });
    </script>
  </body>
</html>

