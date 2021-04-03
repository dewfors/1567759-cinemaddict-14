//const randomText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateTitle = (isAlternativeTitle = false) => {
  // let alternativeTitles = null;
  // let alternativeTitle = null;
  const titles = [
    'Лига справедливости',
    'Охотники на монстров',
    'Ведьмы',
    'Аннигиляция',
    'Последний богатырь',
    'Петля времени',
    'Аватар',
    'Чудо-женщина',
    'Пиксели',
  ];

  const alternativeTitles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
    'Made for Each Other',
  ];

  // if (isAlternativeTitle) {
  //   alternativeTitles = randomText.split('.');
  //   alternativeTitle = alternativeTitles[getRandomInteger(0, alternativeTitles.length - 1)];
  // }

  const randomIndex = !isAlternativeTitle
    ? getRandomInteger(0, titles.length - 1)
    : getRandomInteger(0, alternativeTitles.length - 1);

  return !isAlternativeTitle
    ? titles[randomIndex]
    : alternativeTitles[randomIndex];
};

export const generateFilm = () => {
  return {
    tilte: generateTitle(),
    alternative_title: generateTitle(true),
    total_rating: 5.3,
    poster: 'images/posters/blue-blazes.jpg',
    age_rating: 0,
    director: 'Tom Ford',
    writers: [
      'Takeshi Kitano',
    ],
    actors: [
      'Morgan Freeman',
    ],
    release: {
      date: '2019-05-11T00:00:00.000Z',
      release_country: 'release_country',
    },
    runtime: 77,
    genre: [
      'Comedy',
    ],
    isSeveralGenres: false,
    description: 'description',
  };
};
