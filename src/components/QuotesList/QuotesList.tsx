import {useCallback, useEffect, useState} from 'react';
import Spinner from '../Spinner/Spinner';
import axiosApi from '../../axiosApi';
import {useNavigate, useParams} from 'react-router-dom';
import {Quote} from '../../types';

const QuotesList = () => {
  const navigate = useNavigate();
  const {categoryId} = useParams();
  const [quotes, setQuotes] = useState<Quote[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(`/quotes.json?orderBy="category"&equalTo="${categoryId}"`);
      if (response.data) {
        const quotesData: { [key: string]: Quote } = response.data;
        const quotesArray: Quote[] = Object.values(quotesData);
        setQuotes(quotesArray);
      } else {
        setQuotes([]);
      }
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes, categoryId]);

  const editQuote = (quoteId: string) => {
    navigate(`/quotes/${quoteId}/edit`);
  };

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div>
      <h2>Quotes of {categoryId}</h2>
      {quotes && quotes.length > 0 ? (
        <ul>
          {quotes.map((quote) => (
            <li key={quote.id}>
              <p>Author: {quote.author}</p>
              <p>Text: {quote.text}</p>
              <button className="btn btn-success" onClick={() => editQuote(quote.id)}>Edit</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quotes available for this category.</p>
      )}
    </div>
  );
};

export default QuotesList;