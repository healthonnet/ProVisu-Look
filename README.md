hon-provisu-extension
=====================

Provisu extension for visual impaired people.

Install
-------

```bash
$ npm install
$ gulp build
```

Run
---

### web

```bash
$ npm start
```

A server will be launched on http://localhost:3000

### extension

from google Chrome:

* Go to Settings ==> Extensions
* Enable Developer mode
* load unpacked extension...
* select `/dist`

TODO
----

* **app**
  * ~~move utils files when `gulp build`.~~
  * store preferences.
* **web**
  * move utils files when building `web`.
  * ~~link utils files to web structure (old format is in use).~~
  * store preferences.

Developers
----------

* Pierre Repetto-Andipatin — <pierre.repetto@healthonnet.org>

License
-------

Apache License 2.0
