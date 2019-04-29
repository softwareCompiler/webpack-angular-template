import  './main.css';
import {greeting}  from  './base';
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
import '@fortawesome/fontawesome-free/js/all'
//import '@fortawesome/fontawesome-free/js/solid'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'

//library.add(fas, far, fab)
library.add(fas)

//dom.i2svg()
console.log(greeting());