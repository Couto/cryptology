'use strict';

// Yes, I know, this is a bag of utilities with a bunch or random functions
// but truth is, for now I don't really need external packages or something
// just for a couple of utilities

export function mod(n, m) {
  return ((n % m) + m) % m;
}
