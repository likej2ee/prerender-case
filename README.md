prerender server
=======================

the prerender node application from
[prerender](https://github.com/prerender/prerender)
[prerender-mongo](https://github.com/dottodot/prerender-mongo)

How to use
----------

In your local prerender-case project run:

    $ npm install
    $ node server.js

How to update stored cache
--------------------------

Just change the HTTP GET method to `POST` or `PUT`, then prerender will recache it.
