import './modules/form';
import './modules/icons';
import './modules/menu';
import './modules/transition';
import './modules/wipe';

const body = document.querySelectorAll('.no-js');
body.classList.remove('no-js');
body.classList.add('js');

if ( module.hot ) {
  module.hot.accept();
}