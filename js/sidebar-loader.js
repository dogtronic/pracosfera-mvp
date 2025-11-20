/**
 * Funkcja do ładowania sidebara dla różnych typów użytkowników
 * @param {string} userType - Typ użytkownika: 'admin', 'franchisee' lub 'worker'
 */
function loadSidebar(userType) {
  const sidebarPaths = {
    admin: "../../components/admin/sidebar.html",
    franchisee: "../../components/franchisee/sidebar.html",
    worker: "../../components/worker/sidebar.html",
  };

  const sidebarPath = sidebarPaths[userType];

  if (!sidebarPath) {
    console.error("Nieprawidłowy typ użytkownika:", userType);
    const container = document.getElementById("sidebarContainer");
    if (container) {
      container.innerHTML =
        '<div class="p-4 text-red-600">Błąd: Nieprawidłowy typ użytkownika</div>';
    }
    return;
  }

  const container = document.getElementById("sidebarContainer");

  if (!container) {
    console.error("Nie znaleziono kontenera sidebara (sidebarContainer)");
    return;
  }

  fetch(sidebarPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      container.innerHTML = data;

      // Wykonaj skrypty z załadowanego HTML
      const scripts = container.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      });

      // Po załadowaniu sidebara, ustaw aktywny link
      setTimeout(() => {
        if (window.setActiveNavLink) {
          window.setActiveNavLink();
        }
      }, 100);
    })
    .catch((error) => {
      console.error("Błąd ładowania sidebara:", error);
      container.innerHTML =
        '<div class="p-4 text-red-600">Błąd ładowania sidebara. Odśwież stronę.</div>';
    });
}

