let movies = [
    { id: '1', name: 'Inception', director_name: 'Christopher Nolan', production_house: 'Warner Bros.', release_date: '2010-07-16', rating: 8.8 },
    { id: '2', name: 'The Dark Knight', director_name: 'Christopher Nolan', production_house: 'Warner Bros.', release_date: '2008-07-18', rating: 9.0 }
  ];
  
  const resolvers = {
    Query: {
      getMovies: () => movies,
      getMovieById: (_, { id }) => {
        return movies.find(movie => movie.id === id);
      }
    },
    Mutation: {
      addMovie: (_, { name, director_name, production_house, release_date, rating }) => {
        const newMovie = {
          id: String(movies.length + 1), // Generate new ID
          name,
          director_name,
          production_house,
          release_date,
          rating
        };
        movies.push(newMovie);
        return newMovie;
      },
      updateMovie: (_, { id, name, director_name, production_house, release_date, rating }) => {
        let movie = movies.find(movie => movie.id === id);
        if (movie) {
          movie.name = name;
          movie.director_name = director_name;
          movie.production_house = production_house;
          movie.release_date = release_date;
          movie.rating = rating;
          return movie;
        }
        return null;
      },
      deleteMovie: (_, { id }) => {
        const movieIndex = movies.findIndex(movie => movie.id === id);
        if (movieIndex !== -1) {
          const deletedMovie = movies.splice(movieIndex, 1);
          return deletedMovie[0];
        }
        return null;
      }
    }
  };
  
  module.exports = resolvers;
  