hon-provisu-extension
=====================

[![Build Status](https://travis-ci.org/healthonnet/hon-provisu-extension.svg?branch=master)](https://travis-ci.org/healthonnet/hon-provisu-extension)

**Pro Visu Look** – Background, text color and font size change.

Currently available on the
[Chrome Store](https://chrome.google.com/webstore/detail/pro-visu-look/aclahhnnigljilaknnbjbjeopdcfhoad).

Install
-------

### extension

```bash
$ npm install
$ bower install
$ gulp build
```

### web service

```bash
$ npm install
$ bower install
$ gulp build-web
```

### toolbar

```bash
$ npm install
$ bower install
$ gulp build-toolbar
```

Run
---

### web

```bash
$ gulp server
```

A server will be launched on http://localhost:3000

### extension

from google Chrome:

* Go to Settings ==> Extensions
* Enable Developer mode
* load unpacked extension...
* select `/dist`

### toolbar

```bash
$ gulp serve-toolbar
```

Toolbar usage
-------------

### Options

* **container** : `<div>` container to put the toolbar.
* **url** : url to parse.
* **i18n** : language for tooltip. Values: `en | fr | es`.
* **responsive** : make toolbar responsive. Optional, default value is `true`.
* **fontSize** : show fontSize controls. Optional, default value is `true`.
* **icon** : show only one icon. Optional, default value is `false`, values can be `white | black | blue | cyan`.

### Blue icon with font size controls in French

```bash
loadProvisuToolbar({
  container: 'oneB',
  url: document.URL,
  i18n: 'fr',
  icon: 'blue',
  fontSize: true,
});
```

Documentation
-------------

Original documentation for extension preparation.

```bash
$ gulp doc
```

Developers
----------

* Cédric Frossard — <cedric.frossard@healthonnet.org>
* Pierre Repetto-Andipatin — <pierre.repetto@healthonnet.org>
* William Belle — <william.belle@gmail.com>

License
-------

Apache License 2.0
