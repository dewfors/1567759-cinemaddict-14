export const createFilmsStatisticsTemplate = (films) => {
  const filmsCount = films.length;
  return `<p>
            ${filmsCount} movies inside
          </p>`;
};
