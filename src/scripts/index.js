import '../styles/index.css';

// Scripts
import './postcardInteract';
import './app';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');