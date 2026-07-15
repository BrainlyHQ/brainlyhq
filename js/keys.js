// =========================================================================
// PĘK KLUCZY (API KEYS / ACCESS TOKENS) DLA PANELU ADMINISTRATORA
// Możesz tu ręcznie dodawać, usuwać lub edytować klucze dostępu.
// =========================================================================
const ADMIN_API_KEYS = [
    "admin-brainly-hq-2026",    /* Twój główny klucz */
    "moderator-key-sec-99",     /* Klucz dla asystenta */
    "super-secret-key-123"      /* Dodatkowy klucz testowy */
];

// Funkcja sprawdzająca, czy podany klucz znajduje się w naszym pęku
function validateApiKey(key) {
    return ADMIN_API_KEYS.includes(key.trim());
}
