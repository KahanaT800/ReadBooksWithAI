(function () {
  function decodeMermaidBlocks() {
    var blocks = document.querySelectorAll('pre.mermaid-encoded[data-mermaid]');
    blocks.forEach(function (block) {
      var encoded = block.getAttribute('data-mermaid');
      var decoded = decodeURIComponent(encoded);
      var div = document.createElement('div');
      div.className = 'mermaid';
      div.textContent = decoded;
      block.parentNode.replaceChild(div, block);
    });
  }

  function initMermaid() {
    decodeMermaidBlocks();
    if (window.mermaid) {
      mermaid.initialize({ startOnLoad: false, theme: 'default' });
      mermaid.run({ querySelector: '.mermaid' });
    }
  }

  // Load mermaid from CDN
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
  script.onload = initMermaid;
  document.head.appendChild(script);

  // Re-render on page change (honkit SPA navigation)
  if (window.gitbook) {
    window.gitbook.events.bind('page.change', function () {
      decodeMermaidBlocks();
      if (window.mermaid) {
        mermaid.run({ querySelector: '.mermaid' });
      }
    });
  }
})();
