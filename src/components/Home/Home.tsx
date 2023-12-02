import {useEffect, useState} from 'react';
import {Quote} from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../Spinner/Spinner';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState<Quote[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const response = await axiosApi.get('quotes.json');
        setQuotes(response.data);
      } finally {
        setLoading(false);
      }
    };

    if (!quotes) {
      void fetchQuotes();
    }
  }, [quotes]);

  const editQuote = (quoteId: string) => {
    navigate(`/quotes/${quoteId}/edit`);
  };

  const deleteQuote = async (quoteId: string) => {
    try {
      await axiosApi.delete(`quotes/${quoteId}.json`);
      setQuotes((prevQuotes) => {
        if (Array.isArray(prevQuotes)) {
          return prevQuotes.filter((quote) => quote.id !== quoteId);
        }
        return prevQuotes;
      });
    } catch (error) {
      console.error('Failed to delete quote', error);
    }
  };


  if (loading) {
    return <Spinner/>;
  }

  if (!quotes) {
    return (
      <div className="no-quotes">
        <p>No quotes available.</p>
      </div>
    );
  }

  return (
    <div className="posts mt-3">
      <h3>All</h3>
      {Object.entries(quotes).map(([quoteId, quote]: [string, Quote]) => (
        <div className="post card mb-3" key={quoteId}>
          <div className="card-body">
            <p>"{quote.text}"</p>
            <p className="card-title">author: {quote.author}</p>
            <button className="btn btn-success" onClick={() => editQuote(quoteId)}>Edit</button>
            <button className="btn btn-danger" onClick={() => deleteQuote(quoteId)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
