  var state = 'neutral';

  function isPortrait() {
    return window.innerWidth <= window.innerHeight;
  }

  /* ── Color del header según sección activa ─────────────────── */
  function setColors(mode) {
    var name  = document.getElementById('hName');
    var links = [
      document.getElementById('hMail'),
      document.getElementById('hLi'),
      document.getElementById('hBe')
    ];

    if (mode === 'on-dark') {
      // Fondo negro → nombre blanco (mix-blend-mode), contacto blanco
      name.className = 'h-name';
      links.forEach(function(a) { a.className = 'c-white'; });

    } else if (mode === 'on-light') {
      // Fondo blanco → nombre rojo, contacto rojo
      name.className = 'h-name on-light';
      links.forEach(function(a) { a.className = 'c-red'; });

    } else {
      // Neutro → nombre blend-mode (legible sobre ambos), contacto rojo
      name.className = 'h-name';
      links.forEach(function(a) { a.className = 'c-red'; });
    }
  }

  /* ── Expandir panel ────────────────────────────────────────── */
  function expand(side) {
    if (state === side) return;

    var pi = document.getElementById('panelInd');
    var pc = document.getElementById('panelChar');
    var li = document.getElementById('landingInd');
    var lc = document.getElementById('landingChar');
    var ci = document.getElementById('contentInd');
    var cc = document.getElementById('contentChar');
    var header = document.getElementById('hName').closest('.header');

    if (side === 'ind') {
      pi.classList.add('expanded');    pc.classList.add('collapsed');
      pi.classList.remove('collapsed'); pc.classList.remove('expanded');
      li.style.display = 'none';  ci.style.display = 'block';
      lc.style.display = 'flex';  cc.style.display = 'none';
      document.getElementById('innerInd').scrollTop = 0;
      setColors('on-dark');
      if (header) { header.classList.add('shift-left'); header.classList.remove('shift-right'); }
    } else {
      pc.classList.add('expanded');    pi.classList.add('collapsed');
      pc.classList.remove('collapsed'); pi.classList.remove('expanded');
      lc.style.display = 'none';  cc.style.display = 'block';
      li.style.display = 'flex';  ci.style.display = 'none';
      document.getElementById('innerChar').scrollTop = 0;
      setColors('on-light');
      if (header) { header.classList.add('shift-right'); header.classList.remove('shift-left'); }
    }
    state = side;
  }

  /* ── Colapsar (volver al 50/50) ────────────────────────────── */
  function collapse(e) {
    if (e) e.stopPropagation();

    var pi = document.getElementById('panelInd');
    var pc = document.getElementById('panelChar');
    var header = document.getElementById('hName').closest('.header');

    pi.classList.remove('expanded', 'collapsed');
    pc.classList.remove('expanded', 'collapsed');

    document.getElementById('landingInd').style.display = 'flex';
    document.getElementById('landingChar').style.display = 'flex';
    document.getElementById('contentInd').style.display  = 'none';
    document.getElementById('contentChar').style.display = 'none';

    if (header) { header.classList.remove('shift-left', 'shift-right'); }

    setColors('neutral');
    state = 'neutral';
  }

  /* ── Wait for DOM to load ──────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function() {
    /* ── Carousel rotation ─────────────────────────────────────── */
    function rotateCarousel(carouselId) {
      var carousel = document.getElementById(carouselId);
      if (!carousel) return;
      
      var images = carousel.querySelectorAll('.carousel-img');
      if (images.length === 0) return;
      
      var currentIndex = 0;
      
      setInterval(function() {
        // Remove active from current image
        images[currentIndex].classList.remove('active');
        
        // Move to next image
        currentIndex = (currentIndex + 1) % images.length;
        
        // Add active to new image
        images[currentIndex].classList.add('active');
      }, 4000); // Change image every 4 seconds
    }
    
    // Start carousels
    rotateCarousel('carouselInd');
    rotateCarousel('carouselChar');

    /* ── Listeners: paneles ────────────────────────────────────── */
    document.getElementById('panelInd').addEventListener('click', function(e) {
      if (state === 'neutral') expand('ind');
      else if (state === 'char') collapse(e);
      // si state === 'ind' no hacemos nada (scroll libre)
    });

    document.getElementById('panelChar').addEventListener('click', function(e) {
      if (state === 'neutral') expand('char');
      else if (state === 'ind') collapse(e);
    });

    /* ── Listeners: botones volver ─────────────────────────────── */
    document.getElementById('backInd').addEventListener('click', function(e) {
      e.stopPropagation();
      collapse(e);
    });
    document.getElementById('backChar').addEventListener('click', function(e) {
      e.stopPropagation();
      collapse(e);
    });
  });