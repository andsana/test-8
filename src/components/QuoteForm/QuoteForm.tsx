import React, {useEffect, useState, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import {CATEGORIES} from '../../Constant/Constant';
import {Quote, QuoteMutation} from '../../types';

const QuoteForm = () => {
  const navigate = useNavigate();
  const {quoteId} = useParams();
  const [quote, setQuote] = useState<QuoteMutation>({
    category: '',
    author: '',
    text: '',
  });
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(`quotes/${quoteId}.json`);
      const quoteData: Quote = response.data;
      setQuote({
        category: quoteData.category,
        author: quoteData.author,
        text: quoteData.text,
      });
    } finally {
      setLoading(false);
    }
  }, [quoteId]);

  useEffect(() => {
    if (quoteId) {
      void fetchData();
    }
  }, [fetchData, quoteId]);

  const quoteChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const {name, value} = event.target;
      setQuote((prevState: QuoteMutation) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (quoteId) {
        await axiosApi.put(`quotes/${quoteId}.json`, {
          ...quote,
        });
      } else {
        await axiosApi.post('quotes.json', {
          ...quote,
        });
      }
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="name">Category</label>
        <select
          id="category"
          name="category"
          required
          className="form-select"
          value={quote.category}
          onChange={quoteChanged}
        >
          {CATEGORIES.map((category) => (
            <option key={category.id} value={category.id}>
              {category.id}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          name="author"
          required
          className="form-control"
          value={quote.author}
          onChange={quoteChanged}
        />
      </div>
      <div className="form-group">
        <label htmlFor="text">Quote text</label>
        <textarea
          id="text"
          name="text"
          required
          className="form-control"
          value={quote.text}
          onChange={quoteChanged}
        />
      </div>
      <button disabled={loading} type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );

  return (
    <div className="row mt-2">
      <div className="col">
        <h4>{quoteId ? 'Edit quote' : 'Add new quote'}</h4>
        {form}
      </div>
    </div>
  );
};

export default QuoteForm;





