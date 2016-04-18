# webpack-angular-template

Create a webpack template project which supports AngularJS 1.5, ES6 with Babel, RxJS, and service worker for offline experience. This project mainly consists of two controllers, one Angular directive,  and the corresponding views. The compiled applicaiton can be dropped to an HTTP server and served at a predefined domain.

<h3>Installation</h3>
<i>```git clone git@github.com:liyutech/webpack-angular-template```</i>
<p>
Run the following command at the root path of the cloned project:
</p>
<i>npm install</i>

<h3>Usage Example</h3>
To run in the dev mode:
<i>npm start</i>
<p>
Use a browser to open the following url: https://localhost:8080. The user name and password for the login fields are Ada and Ada123, respectively.
</p>

To deploy the application, run the following command at the root of the project:
<p><i>npm run build</i></p>
This will compile the application. The compiled files will be output to the domain/ directory.

<p>After the compilation is complete, copy the entire domain/ directory to the document root of an HTTP server. Notice that since service workers can only be run under the https protoocol, the HTTP server should be configured to support https.
</p>
<p>
It is assumed the document root of the server is <i>/www</i>. To use a different document root, modify the default defined in webpack.config.prod.js. The deployed application can be accessed at https://localhost:8443/domain.
</p>
Notice that if the browser does not support service workers, the application will fall back to appcache. 

<h3>License</h3>
<p>MIT (<a>http://www.opensource.org/licenses/mit-license.php</a>)</p>
