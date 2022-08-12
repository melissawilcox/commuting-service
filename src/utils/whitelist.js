export default (body, ...whitelists) => {
  const bodies = whitelists.map(({ type = null, whitelist }) => {
    const whitelistedBody = Object.entries(body).reduce(
      (newBody, [key, value]) =>
        whitelist.includes(key)
          ? {
            ...newBody,
            [key]: value,
          }
          : newBody,
      {}
    );
    return { type, body: whitelistedBody };
  });

  return (
    bodies.find(({ body }) => Object.keys(body).length) || {
      body: {},
      type: null,
    }
  );
};
