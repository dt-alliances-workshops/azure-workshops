/**
 * Workshop Progress Tracker
 * Tracks visited sections in localStorage and applies visual styling
 * Only marks sections when user scrolls past them or clicks on them
 * Going back to a previous section clears progress for later sections
 */
(function() {
  const STORAGE_KEY = 'workshop-progress';
  let lastScrollIndex = -1;
  let clickCooldown = false;
  let userHasScrolled = false;

  // Get current page path (normalized)
  function getCurrentPath() {
    return window.location.pathname;
  }

  // Load visited sections from localStorage
  function getVisitedSections() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  // Save visited sections to localStorage
  function saveVisitedSections(visited) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
    } catch (e) {
      // localStorage might be full or disabled
    }
  }

  // Get all nav links for the current page's TOC (in order)
  function getTocNavLinks() {
    const links = [];
    const currentPath = getCurrentPath();
    const allNavLinks = document.querySelectorAll('a.md-nav__link');

    allNavLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      if (!href) return;

      let hash = null;

      if (href.startsWith('#')) {
        hash = href;
      } else if (href.includes('#')) {
        const hashIndex = href.indexOf('#');
        hash = href.substring(hashIndex);
        const linkPath = href.substring(0, hashIndex);
        if (!linkPath.endsWith(currentPath) && !currentPath.endsWith(linkPath.replace(/\/$/, ''))) {
          return;
        }
      }

      if (hash && hash !== '#') {
        links.push({
          element: link,
          hash: hash
        });
      }
    });

    return links;
  }

  // Get the index of a hash in the TOC
  function getHashIndex(tocLinks, hash) {
    for (let i = 0; i < tocLinks.length; i++) {
      if (tocLinks[i].hash === hash) {
        return i;
      }
    }
    return -1;
  }

  // Find which section is currently visible based on scroll position
  function findVisibleSectionIndex(tocLinks) {
    const scrollPos = window.scrollY + 150;
    let lastVisibleIndex = -1;

    for (let i = 0; i < tocLinks.length; i++) {
      const hash = tocLinks[i].hash;
      const targetId = hash.substring(1);
      const target = document.getElementById(targetId);

      if (target && target.offsetTop <= scrollPos) {
        lastVisibleIndex = i;
      }
    }
    return lastVisibleIndex;
  }

  // Mark a single section as visited
  function markSectionVisited(tocLinks, index) {
    if (index < 0 || index >= tocLinks.length) return;

    const visited = getVisitedSections();
    const path = getCurrentPath();

    if (!visited[path]) {
      visited[path] = [];
    }

    const hash = tocLinks[index].hash;
    if (!visited[path].includes(hash)) {
      visited[path].push(hash);
      saveVisitedSections(visited);
    }
  }

  // Reset progress to a specific index (clears everything after)
  function resetProgressToIndex(tocLinks, upToIndex) {
    const visited = getVisitedSections();
    const path = getCurrentPath();
    const allHashes = tocLinks.map(function(link) { return link.hash; });

    const newVisited = [];
    for (let i = 0; i <= upToIndex && i < allHashes.length; i++) {
      newVisited.push(allHashes[i]);
    }

    visited[path] = newVisited;
    saveVisitedSections(visited);
  }

  // Get the furthest visited index for current page
  function getMaxVisitedIndex(tocLinks) {
    const visited = getVisitedSections();
    const path = getCurrentPath();
    const pathVisited = visited[path] || [];

    let maxIndex = -1;
    for (let i = 0; i < tocLinks.length; i++) {
      if (pathVisited.includes(tocLinks[i].hash)) {
        maxIndex = i;
      }
    }
    return maxIndex;
  }

  // Apply visited styling to nav links
  function applyVisitedStyling() {
    const visited = getVisitedSections();
    const currentPath = getCurrentPath();
    const pathVisited = visited[currentPath] || [];

    // First, remove all visited classes
    document.querySelectorAll('.md-nav__link--visited').forEach(function(link) {
      link.classList.remove('md-nav__link--visited');
    });

    // Apply to TOC links
    document.querySelectorAll('a.md-nav__link').forEach(function(link) {
      const href = link.getAttribute('href');
      if (!href) return;

      let hash = null;
      if (href.startsWith('#')) {
        hash = href;
      } else if (href.includes('#')) {
        const hashIndex = href.indexOf('#');
        hash = href.substring(hashIndex);
      }

      if (hash && pathVisited.includes(hash)) {
        if (!link.classList.contains('md-nav__link--active')) {
          link.classList.add('md-nav__link--visited');
        }
      }
    });

    // Also mark the main lab pages in the left nav if they have visited sections
    markLabPagesAsVisited(visited);
  }

  // Mark lab pages (Lab 1, Lab 2, etc.) as visited in the main nav
  function markLabPagesAsVisited(visited) {
    document.querySelectorAll('.md-nav__link').forEach(function(link) {
      const href = link.getAttribute('href');
      if (!href) return;

      // Skip anchor links (both #section and full-url#section formats)
      if (href.startsWith('#') || href.includes('#')) return;

      let linkPath;
      try {
        const url = new URL(href, window.location.origin);
        linkPath = url.pathname;
      } catch (e) {
        return;
      }

      if (visited[linkPath] && visited[linkPath].length > 0) {
        if (!link.classList.contains('md-nav__link--active')) {
          link.classList.add('md-nav__link--visited');
        }
      }
    });
  }

  // Handle click on nav link
  function handleNavClick(event) {
    const link = event.target.closest('.md-nav__link');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    let hash = null;
    if (href.startsWith('#')) {
      hash = href;
    } else if (href.includes('#')) {
      const hashIndex = href.indexOf('#');
      hash = href.substring(hashIndex);
    }

    if (!hash) return;

    const tocLinks = getTocNavLinks();
    const clickedIndex = getHashIndex(tocLinks, hash);

    if (clickedIndex >= 0) {
      const maxVisited = getMaxVisitedIndex(tocLinks);

      if (clickedIndex <= maxVisited) {
        // Clicking on a previous/current section - reset progress to that point
        resetProgressToIndex(tocLinks, clickedIndex);
      } else {
        // Clicking on a future section - mark it and everything before
        for (let i = 0; i <= clickedIndex; i++) {
          markSectionVisited(tocLinks, i);
        }
      }

      clickCooldown = true;
      userHasScrolled = true;
      lastScrollIndex = clickedIndex;

      setTimeout(applyVisitedStyling, 50);

      setTimeout(function() {
        const newTocLinks = getTocNavLinks();
        lastScrollIndex = findVisibleSectionIndex(newTocLinks);
        clickCooldown = false;
      }, 300);
    }
  }

  // Handle scroll - mark sections as visited when scrolled past
  function handleScroll() {
    if (clickCooldown) return;

    const tocLinks = getTocNavLinks();
    if (tocLinks.length === 0) return;

    const currentVisibleIndex = findVisibleSectionIndex(tocLinks);

    // First scroll event - sync position without marking
    if (!userHasScrolled) {
      userHasScrolled = true;
      lastScrollIndex = Math.max(lastScrollIndex, currentVisibleIndex);
      return;
    }

    // Only mark sections if scrolled forward
    if (currentVisibleIndex > lastScrollIndex) {
      for (let i = lastScrollIndex + 1; i <= currentVisibleIndex; i++) {
        markSectionVisited(tocLinks, i);
      }
      lastScrollIndex = currentVisibleIndex;
      applyVisitedStyling();
    }
  }

  // Debounce helper
  function debounce(func, wait) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  }

  // Reset progress for current page only
  function resetCurrentPageProgress() {
    try {
      const visited = getVisitedSections();
      const path = getCurrentPath();
      delete visited[path];
      saveVisitedSections(visited);
    } catch (e) {
      // localStorage might be disabled
    }
    lastScrollIndex = -1;
    userHasScrolled = false;
    applyVisitedStyling();
  }

  // Reset all progress across all pages
  function resetAllProgress() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // localStorage might be disabled
    }
    lastScrollIndex = -1;
    userHasScrolled = false;
    applyVisitedStyling();
  }

  // Create and insert reset progress buttons
  function createResetButton() {
    // Check if buttons already exist
    if (document.getElementById('reset-progress-wrapper')) return;

    // Find the article content area to insert buttons
    const article = document.querySelector('article.md-content__inner');
    if (!article) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'reset-progress-wrapper';
    wrapper.className = 'reset-progress-wrapper';

    // Reset current section button
    const resetPageBtn = document.createElement('button');
    resetPageBtn.className = 'reset-progress-btn reset-progress-btn--page';
    resetPageBtn.innerHTML = '<span class="reset-icon">↺</span> Reset Section';
    resetPageBtn.title = 'Reset progress for current section';

    resetPageBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (confirm('Reset progress for this section?')) {
        resetCurrentPageProgress();
      }
    });

    // Reset all progress button
    const resetAllBtn = document.createElement('button');
    resetAllBtn.className = 'reset-progress-btn reset-progress-btn--all';
    resetAllBtn.innerHTML = '<span class="reset-icon">↺</span> Reset All Progress';
    resetAllBtn.title = 'Reset progress for all labs';

    resetAllBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (confirm('Reset ALL workshop progress? This will clear visited sections across all labs.')) {
        resetAllProgress();
      }
    });

    wrapper.appendChild(resetPageBtn);
    wrapper.appendChild(resetAllBtn);

    // Insert at the beginning of the article content
    article.insertBefore(wrapper, article.firstChild);
  }

  // Initialize
  function init() {
    const tocLinks = getTocNavLinks();
    lastScrollIndex = getMaxVisitedIndex(tocLinks);
    applyVisitedStyling();
    createResetButton();

    document.addEventListener('click', handleNavClick);
    window.addEventListener('scroll', debounce(handleScroll, 150));

    // For MkDocs instant loading
    if (typeof document$ !== 'undefined') {
      document$.subscribe(function() {
        const newTocLinks = getTocNavLinks();
        lastScrollIndex = getMaxVisitedIndex(newTocLinks);
        if (!clickCooldown) {
          userHasScrolled = false;
        }
        applyVisitedStyling();
        createResetButton();
      });
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
