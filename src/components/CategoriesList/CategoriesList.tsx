import {CATEGORIES} from '../../Constant/Constant';
import {Link} from 'react-router-dom';

const CategoriesList = () => {
  return (
    <nav>
      <ul className="list-group mt-3">
        {CATEGORIES.map((category) => (
          <li key={category.id} className="list-group-item">
            <Link to={`/quotes/${category.id}`}>{category.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoriesList;