import {useEffect, useState} from 'react';
import {Quote} from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../Spinner/Spinner';

const Home = () => {
  const [quotes, setQuotes] = useState<Quote[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuetes = async () => {
      try {
        setLoading(true);
        const response = await axiosApi.get('quotes.json');
        setQuotes(response.data);
      } finally {
        setLoading(false);
      }
    };

    void fetchQuetes();
  }, []);

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
      {Object.entries(quotes).map(([quoteId, quote]: [string, Quote]) => (
        <div className="post card mb-3" key={quoteId}>
          <div className="card-body">
            <p>"{quote.text}"</p>
            <p className="card-title">author: {quote.author}</p>
            {/*<Link to={`/posts/${postId}`}>Read More &gt;</Link>*/}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;