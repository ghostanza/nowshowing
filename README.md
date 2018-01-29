# nowshowing
Node scraper for local movie theatre showtimes

### Basic Usage:
```
node movies.js -[flags]
```

### Flags:
#### `-b` - Brattle Theatre
#### `-c` - Coolidge Theatre
#### `-s` - Somerville Theatre

***Can be used together (ex: `node movies.js -bcs` ,`node movies.js -sc`, `node movies.js -s -b`)***


### Examples:
```
$ node movies.js -bcs
==================
  COOLIDGE:
==================
  CALL ME BY YOUR NAME
  12:30pm
  3:45pm
  6:30pm
  9:15pm
----------------
  MILDRED PIERCE
  7:00pm
----------------
  THE SHAPE OF WATER
  12:45pm
  3:30pm
  6:45pm
  9:25pm
----------------

==================
  SOMERVILLE:
==================
  I TONYA (R):
  4:40 pm
  7:15 pm
----------------
  LADY BIRD (R):
  5:00 pm
  7:40 pm
----------------
  PHANTOM THREAD 35MM (R):
  4:30 pm
  7:20 pm
----------------
  THE DISASTER ARTIST (R):
  4:20 pm
----------------
  THE POST (PG13):
  4:45 pm
  7:30 pm
----------------

==================
  BRATTLE:
==================
  Sighted Eyes/Feeling Heart: Lorraine Hansberry
  7:00 PM
----------------
```
***Note:  The order of the results may vary as they show in order of whichever HTTP request finishes first***


### TODOS:
- Add default to display all theatres
- More theatres
- Add a `-h` flag to display the help menu/options
