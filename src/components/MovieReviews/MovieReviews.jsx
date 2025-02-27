import { useEffect, useState } from "react";
import { getMovieReviews } from "../../tmbdApi.js";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const movieReviews = await getMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (!reviews.length) {
    return <div>No reviews available.</div>;
  }

  return (
    <div>
      <h4>Reviews</h4>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h5>{review.author}</h5>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
