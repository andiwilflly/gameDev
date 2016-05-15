import ReactDOM from 'react-dom';
import 'babel-core/lib/polyfill'; // For ES7 features
import Routes from 'Routes.js';
import { history } from 'xhistory.js';

require('./scss/main.scss');

// Images
var requireImgs = require.context('./images/', true, /\.(jpe?g|png|gif|ico)$/i);
requireImgs.keys().forEach(requireImgs);


// Setup translations
const LANGS = ['en', 'ru', 'ua'];
var messages = {};
_.map(LANGS, function(lang) {
    messages[lang] = { translation : require("./translate/" + lang + "/translations.json") };
});

i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    resStore: messages,
    lngWhitelist: LANGS,
    fallbackOnEmpty: true,
    fallbackOnNull: true,
    keyseparator: '~',
    nsseparator: '~'
});


// Setup App
ReactDOM.render(<Routes history={ history }/>, document.getElementById('root'));
