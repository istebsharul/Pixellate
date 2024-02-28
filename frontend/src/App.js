// App.js
import { Outlet } from 'react-router-dom';
import Header from './components/Header.js';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <Header />
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Outlet />
    </>
  );
}

export default App;
