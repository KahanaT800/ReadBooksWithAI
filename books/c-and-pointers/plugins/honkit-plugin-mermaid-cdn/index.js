module.exports = {
  website: {
    assets: './assets',
    js: ['mermaid-init.js']
  },
  hooks: {
    'page:before': function (page) {
      // Encode mermaid content as base64 to prevent markdown parser from escaping arrows
      page.content = page.content.replace(
        /```mermaid([\s\S]*?)```/g,
        function (match, code) {
          var encoded = Buffer.from(code.trim()).toString('base64');
          return '<pre class="mermaid-encoded" data-mermaid="' + encoded + '"></pre>';
        }
      );
      return page;
    }
  }
};
