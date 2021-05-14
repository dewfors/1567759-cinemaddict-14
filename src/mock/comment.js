import {getRandomInteger, generateDate, getRandomiseArray} from '../util/common.js';
import {nanoid} from 'nanoid';
// import {getRandomiseArray} from '../util/utils';

const comments = [];

const generateAuthor = () => {
  const authors = [
    'Amelia Oliver',
    'Heather Williams',
    'Jessica Grace',
    'Jack Davis',
  ];

  const randomIndex = getRandomInteger(0, authors.length - 1);
  return authors[randomIndex];
};

const generateEmotion = () => {
  const emotions = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);
  return emotions[randomIndex];
};

const generateCommentText = () => {
  const commentText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

  const commentSentenceMin = 1;
  const commentSentenceMax = 2;

  const commentArray = commentText.split('.')
    .map((text) => text.trim())
    .filter((text) => text.length > 0);

  const randomCountCommentSentence = getRandomInteger(commentSentenceMin, commentSentenceMax);
  const randomCommentArray = getRandomiseArray(commentArray, randomCountCommentSentence);
  return randomCommentArray.join('. ').trim() + '.';
};

export const generateComment = () => {

  const comment = {
    id: nanoid(),
    author: generateAuthor(),
    comment: generateCommentText(true),
    date: generateDate(),
    emotion: generateEmotion(),
  };

  comments.push(comment);

  return comment.id;
};

export const addNewComment = () => {

  const comment =   {
    id: nanoid(),
    author: generateAuthor(),
    comment: generateCommentText(true),
    date: generateDate(),
    emotion: generateEmotion(),
  };
  comments.push(comment);
  return comment;

};

export const getComments = () => {
  return comments;
};
