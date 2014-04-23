Flickr = exports? and exports or @Flickr = {}

Flickr.crawl = (keywords, fn) ->
  keywords or= ["sonne","meer"]
  Fl = require 'node-flickr'
  flickr = new Fl api_key: '0969ce0028fe08ecaf0ed5537b597f1e'
  opts = per_page: 5, page: 1, tags: keywords.join ','
  flickr.get 'photos.search', opts, (result) ->
    # error handling
    unless flickr and result
      return fn new Error 'Flickr fail!' if fn
      return new Error 'Flickr fail!'
    # parse photo data
    for photo in result.photos.photo
      flickr.get 'photos.getInfo', {photo_id:photo.id}, (infos) ->
        url = infos.photo.urls.url[0]._content
        return fn null, url if fn
        console.log url


