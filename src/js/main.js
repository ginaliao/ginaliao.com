import './../scss/style.scss';

import './modules/form';
import './modules/icons';
import './modules/menu';
import './modules/transition';
import './modules/wipe';

$('.no-js').removeClass('no-js').addClass('js');

if ( module.hot ) {
  module.hot.accept();
}