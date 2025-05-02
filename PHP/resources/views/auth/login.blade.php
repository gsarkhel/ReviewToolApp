<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Review Tool - Login</title>

    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    />

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Proxima Nova", sans-serif;
        }

        body {
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-color: #f8f9fa;
        }

        /* Top Logo Bar */
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

        /* NAVBAR (Gradient) */
        .navbar-gradient {
            background: linear-gradient(to right, #1DAA58, #193661);
        }
        .navbar-gradient .container {
            display: flex;
            justify-content: center;
        }
        .navbar-gradient .navbar-brand {
            color: #fff !important;
            font-weight: bold;
        }

        /* Centered Login Card */
        .login-container {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
        }

        .login-card {
            width: 90%; /* Occupy most of the width on smaller screens */
            max-width: 400px;
            padding: 30px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .login-title {
            font-size: 2rem;
            font-weight: bold;
            background: linear-gradient(to right, #2484C6, #1DAA58);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
        }

        .btn-gradient {
            background: linear-gradient(to right, #2484C6, #1DAA58);
            border: none;
            color: white;
            padding: 10px;
            font-size: 1rem;
            font-weight: bold;
            width: 100%;
            border-radius: 5px;
            transition: 0.3s;
        }
        .btn-gradient:hover {
            opacity: 0.9;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
            .login-title {
                font-size: 1.5rem; /* Smaller title on mobile */
            }
            .login-card {
                padding: 20px; /* Less padding on mobile */
            }
        }
    </style>
</head>

<body>
    <div class="logo-bar">
        <div class="container-fluid">
            <img src="{{ asset('images/Logo.png') }}" alt="Client Logo" />
        </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-gradient">
        <div class="container">
            <a class="navbar-brand" href="#">Course Review Tool</a>
        </div>
    </nav>

    <div class="login-container">
        <div class="login-card">
            <div class="login-title">Login</div>

            <!-- Display error messages -->
            @if (session('error'))
                <div class="alert alert-danger">
                    {{ session('error') }}
                </div>
            @endif

            <!-- Display validation errors -->
            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            @if(session('success'))
                <div class="alert alert-success" id="success-message">
                    {{ session('success') }}
                </div>
                <script>
                    setTimeout(() => {
                        document.getElementById('success-message').style.display = 'none';
                    }, 5000); // Hides after 5 seconds
                </script>
            @endif

            <form action="{{ route('login.submit') }}" method="POST">
                @csrf
                <div class="mb-3">
                    <input type="text" name="email" class="form-control" placeholder="Email" required />
                </div>
                <div class="mb-3">
                    <input type="password" name="password" class="form-control" placeholder="Password" required />
                </div>
                <button type="submit" class="btn btn-gradient">
                    Submit
                </button>
            </form>
        </div>
    </div>

    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    ></script>
</body>
</html>

