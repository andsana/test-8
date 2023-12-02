import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import QuoteForm from './components/QuoteForm/QuoteForm';

function App() {

  return (
    <div>
      <header>
        <Toolbar/>
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={(
            <Home/>
          )}/>
          <Route path="/new-post" element={(
            <QuoteForm/>
          )}/>

        </Routes>

      </main>
    </div>
  );
}

export default App;
