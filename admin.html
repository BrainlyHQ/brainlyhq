<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BrainlyHQ - Admin Panel</title>
    <link rel="icon" type="image/png" href="assets/BRAINLYHQ LOGO.png">
    <link rel="stylesheet" href="css/style.css">
    
    <script src="js/theme.js"></script>
    <script src="js/keys.js"></script>
    <script src="js/main.js" defer></script>
</head>
<body>

    <header id="header-placeholder"></header>

    <main class="content-section">
        
        <div id="admin-login-screen" class="admin-login-container">
            <h2>Admin Gateway</h2>
            <p>Please enter your Administrator API Key to access the secure panel.</p>
            
            <div class="login-form">
                <div class="form-group">
                    <label for="api-key-input">Secure API Key</label>
                    <input type="password" id="api-key-input" class="form-input" placeholder="Enter key (e.g., admin-...)">
                </div>
                <button id="login-submit-btn" class="login-btn">Unlock Panel</button>
                <div id="login-error-msg" class="login-error">❌ Invalid API Key. Access Denied.</div>
            </div>
        </div>

        <div id="admin-dashboard-screen" style="display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                <div>
                    <h1 class="content-title" style="margin-bottom: 5px;">Admin Control Center</h1>
                    <p style="color: var(--text-secondary);">Authorized Access Only • Secure Session Active</p>
                </div>
                <button id="logout-btn" class="login-btn" style="background-color: #ff4a4a; color: white; padding: 10px 20px; font-size: 0.9rem;">
                    Lock Session
                </button>
            </div>

            <div class="grid-layout">
                <div class="card">
                    <h3 style="color: var(--color-brainly-green);">🔑 API Status</h3>
                    <p style="margin-top: 10px; font-weight: 600;">All local keys are active.</p>
                    <p style="font-size: 0.85rem; margin-top: 5px;">Bramka ręczna działa poprawnie i filtruje nieautoryzowane próby wejścia.</p>
                </div>
                <div class="card">
                    <h3>👥 Community Management</h3>
                    <p style="margin-top: 10px;">Tutaj w przyszłości będziesz mógł zarządzać listą moderatorów, nadawać role i synchronizować ogłoszenia.</p>
                </div>
                <div class="card">
                    <h3>⚙️ System Logs</h3>
                    <p style="margin-top: 10px;">Podgląd ostatnich działań systemowych i zmian konfiguracyjnych na platformie BrainlyHQ.</p>
                </div>
            </div>
        </div>

    </main>

    <footer id="footer-placeholder"></footer>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const loginScreen = document.getElementById('admin-login-screen');
            const dashboardScreen = document.getElementById('admin-dashboard-screen');
            const keyInput = document.getElementById('api-key-input');
            const submitBtn = document.getElementById('login-submit-btn');
            const errorMsg = document.getElementById('login-error-msg');
            const logoutBtn = document.getElementById('logout-btn');

            // 1. Sprawdź czy w tej sesji przeglądarki użytkownik już wpisał poprawny klucz
            const sessionToken = sessionStorage.getItem('admin_session');
            if (sessionToken && typeof validateApiKey === 'function' && validateApiKey(sessionToken)) {
                showDashboard();
            }

            // 2. Obsługa kliknięcia przycisku logowania
            submitBtn.addEventListener('click', handleLogin);
            
            // Obsługa kliknięcia "Enter" w polu tekstowym
            keyInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleLogin();
            });

            function handleLogin() {
                const enteredKey = keyInput.value.trim();
                
                // Sprawdzamy klucz z pliku keys.js
                if (typeof validateApiKey === 'function' && validateApiKey(enteredKey)) {
                    // Sukces: Zapisujemy token w sesji i przełączamy ekrany
                    sessionStorage.setItem('admin_session', enteredKey);
                    errorMsg.style.display = 'none';
                    keyInput.value = '';
                    showDashboard();
                } else {
                    // Błąd: Pokazujemy komunikat
                    errorMsg.style.display = 'block';
                    keyInput.classList.add('error-shake'); // Można dodać animację błędu
                    setTimeout(() => keyInput.classList.remove('error-shake'), 500);
                }
            }

            // 3. Obsługa wylogowania
            logoutBtn.addEventListener('click', () => {
                sessionStorage.removeItem('admin_session');
                showLogin();
            });

            function showDashboard() {
                loginScreen.style.display = 'none';
                dashboardScreen.style.display = 'block';
            }

            function showLogin() {
                dashboardScreen.style.display = 'none';
                loginScreen.style.display = 'block';
            }
        });
    </script>

</body>
</html>
