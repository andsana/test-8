import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home/Home';
import CategoriesList from './components/CategoriesList/CategoriesList';
import QuoteForm from './components/QuoteForm/QuoteForm';
import QuotesList from './components/QuotesList/QuotesList';

function App() {

  return (
    <div>
      <header>
        <Toolbar/>
      </header>
      <div className="row">
        <aside className="col-3">
          <CategoriesList/>
        </aside>
        <main className="container-fluid col-9">
          <Routes>
            <Route path="/" element={(
              <Home/>
            )}/>
            <Route path="/add-quote" element={(
              <QuoteForm/>
            )}/>
            <Route path="/quotes/:categoryId" element={(
              <QuotesList/>
            )}/>
            <Route path="/quotes/:quoteId/edit" element={<QuoteForm />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;