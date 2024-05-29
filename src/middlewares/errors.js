const json = (err, req, res, next) => {
  const isSyntaxError = err instanceof SyntaxError;
  const isBadRequest = err.status == 400
  const hasBody = 'body' in err;

  if (isSyntaxError && isBadRequest && hasBody) {
    res.status(400).json({ error: 'json malformed' });
  } else {
    next(err);
  }
}

export default {
  json
};
