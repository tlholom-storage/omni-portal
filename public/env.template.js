// src/assets/env.template.js
(function(window) {
  window.env = window.env || {};
  window.env["apiUrl"] = "${API_URL}";
  window.env["debug"] = "${DEBUG_MODE}";
})(this);
