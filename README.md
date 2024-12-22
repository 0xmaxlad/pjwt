# A npm package to invalidate user JWTs.

Invaliding user JWTs has a few methods such as maintaining a database of invalid user tokens and checking them everytime when any user makes a request, and others but most of them are not very friendly and need extra attention, here we introduce a simple npm package that can invalidate user tokens without affecting the majority of other users.

## Architecture

User maintains the same secret in .env

A new set of sub-secrets(that do no need to be private and if leaked has no affect on the privacy of the application) are stored in a new file.
Every token is signed from a new secret generated from hashing the root secret and a sub-secret, the index of subsecret is not tokenized using the same tokenization method as earlier.

Whenever we need to invalidate a user, we change the corresponding sub-secret and hence the token is no more valid.

At end, we need to revalidate the users with the same sub-index, as of the invalid user.




