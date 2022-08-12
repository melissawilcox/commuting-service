import JSONAPISerializer from 'json-api-serializer';

import challengeSerializer from './challengeSerializer.js';
import userSerializer from './userSerializer.js';

const Serializer = new JSONAPISerializer({
  unconvertCase: 'camelCase',
});

const serializerArray = [
  challengeSerializer,
  userSerializer,
];

serializerArray.forEach(({ type, options }) => {
  Serializer.register(type, {
    ...options,
    topLevelMeta: (extraData) => ({
      totalResults: extraData.totalResults,
      page: parseInt(extraData.page, 10),
      pageSize: parseInt(extraData.pageSize, 10),
    }),
  });
});

export default Serializer;
