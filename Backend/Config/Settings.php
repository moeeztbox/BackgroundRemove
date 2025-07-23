<?php
// 🔓 Allow requests from any domain (React frontend runs on a different port like 3000)
header("Access-Control-Allow-Origin: *"); 
// You can replace * with a specific domain for better security:
// e.g., header("Access-Control-Allow-Origin: http://localhost:3000");

// 🔧 Allow specific HTTP methods that your backend supports
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
// - POST: for uploading images
// - GET: for testing or pinging routes
// - OPTIONS: sent automatically by browser before CORS requests (preflight)

// 📦 Allow specific headers in incoming requests (e.g., Content-Type for form data)
header("Access-Control-Allow-Headers: Content-Type");

// 🐞 Show all PHP errors (for development only — disable in production)
error_reporting(E_ALL); 
// This tells PHP to report all kinds of errors: notices, warnings, and fatal

// 🖥️ Display those errors directly in the browser (again, development only)
ini_set('display_errors', 1); 
// In production you usually set this to 0 to avoid exposing internal errors to users
