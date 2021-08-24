import '../styles/css/index.css';

// Scripts
import './postcardInteract';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');
