/**
 * themes.js
 * Handles global theme system, dark mode toggle, and preset color themes.
 */

// --- INITIAL SYNCHRONOUS APPLY TO PREVENT FLASH ---
(function () {
    const STORAGE_KEY_MODE = 'selectedMode';
    const STORAGE_KEY_COLOR = 'selectedTheme';

    // Default Preferences
    const defaultMode = 'light';
    const defaultTheme = 'ocean';

    const savedMode = localStorage.getItem(STORAGE_KEY_MODE) || defaultMode;
    const savedTheme = localStorage.getItem(STORAGE_KEY_COLOR) || defaultTheme;

    if (savedMode === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    document.documentElement.setAttribute('data-color', savedTheme);
})();

// --- DOM EVENT LISTENERS (Applied after DOM loads) ---
document.addEventListener('DOMContentLoaded', () => {
    const themeModeToggle = document.getElementById('themeModeToggle');
    const themePresetBtns = document.querySelectorAll('.theme-preset-btn');

    const STORAGE_KEY_MODE = 'selectedMode';
    const STORAGE_KEY_COLOR = 'selectedTheme';

    // Apply initial state to UI components
    if (themeModeToggle) {
        const mode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        themeModeToggle.checked = mode === 'dark';
    }

    const currentTheme = document.documentElement.getAttribute('data-color');
    themePresetBtns.forEach(btn => {
        if (btn.dataset.theme === currentTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    /**
     * Apply Light/Dark Mode
     */
    function applyMode(mode) {
        if (mode === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem(STORAGE_KEY_MODE, mode);
    }

    /**
     * Apply Preset Color Theme
     */
    function applyTheme(themeName) {
        document.documentElement.setAttribute('data-color', themeName);
        localStorage.setItem(STORAGE_KEY_COLOR, themeName);

        themePresetBtns.forEach(btn => {
            if (btn.dataset.theme === themeName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    if (themeModeToggle) {
        themeModeToggle.addEventListener('change', (e) => {
            const newMode = e.target.checked ? 'dark' : 'light';
            applyMode(newMode);
        });
    }

    themePresetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const themeName = btn.dataset.theme;
            applyTheme(themeName);
        });
    });
});
