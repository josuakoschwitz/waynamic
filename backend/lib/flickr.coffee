Flickr = exports? and exports or @Flickr = {}

# Api = require 'flickrapi'
# flickr = null

flickrOptions =
  api_key: "0969ce0028fe08ecaf0ed5537b597f1e",
  secret: "5900120da1580523"

Flickr.crawl = (keywords, fn) ->
  Fl = require 'node-flickr'
  flickr = new Fl api_key: '0969ce0028fe08ecaf0ed5537b597f1e'
  flickr.get 'photos.search', tags: keywords.join(','), (result) ->
    if flickr and result
      fn new Error 'fail'
    else
      fn null, result.photos
