module.exports = {
  website: {
    assets: './assets',
    js: ['mermaid-init.js']
  },
  hooks: {
    'page:before': function (page) {
      // URL-encode mermaid content to prevent markdown parser from escaping arrows
      // encodeURIComponent is natively UTF-8 safe — no base64 needed
      page.content = page.content.replace(
        /```mermaid([\s\S]*?)```/g,
        function (match, code) {
          var encoded = encodeURIComponent(code.trim());
          return '<pre class="mermaid-encoded" data-mermaid="' + encoded + '"></pre>';
        }
      );
      return page;
    }
  }
};
