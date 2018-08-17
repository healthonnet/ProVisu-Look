hon-provisu-extension
=====================

[![Build Status](https://travis-ci.org/healthonnet/ProVisu-Look.svg?branch=master)](https://travis-ci.org/healthonnet/ProVisu-Look)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fhealthonnet%2FProVisu-Look.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fhealthonnet%2FProVisu-Look?ref=badge_shield)

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

* `container` : `String`

  container in which the toolbar is included.

* `url` : `String`

  url to give to the service.

* `i18n` : `en | fr | es`

  language for tooltip.

* `responsive` : `Boolean`

  make toolbar responsive. Optional, default value is `true`.

* `fontSize` : `Boolean`

  show fontSize controls. Optional, default value is `true`.

* `icon` : `white | black | blue | cyan | false`

  show only one icon. Optional, default value is `false`.

### Blue icon with font size controls in French

```bash
<script src="https://provisu.ch/toolbar/latest/toolbar.js" type="text/javascript"></script>
<script>
  loadProvisuToolbar({
    container: 'oneB',
    url: document.URL,
    i18n: 'fr',
    icon: 'blue',
    fontSize: true,
  });
</script>
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


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fhealthonnet%2FProVisu-Look.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fhealthonnet%2FProVisu-Look?ref=badge_large)