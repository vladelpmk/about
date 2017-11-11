require('./style');

console.log('Vladimri');


require('./500px');

_500px.init({sdk_key: '5651f076ba1dc0a251a6cb29f15d0d640821ad91'});

_500px.api('/photos/search', { feature: 'popular', image_size: 2048, term: 'forest', page: Math.floor(Math.random() * 5) }, function (response) {
    console.log(response.data.photos);
    var element = document.getElementById('bg');
    element.style.backgroundImage = "url('" + response.data.photos[Math.floor(Math.random() * 20)].image_url + "')";

});

/*
api500px = new API500px();

api500px.login;

api500px.photos.getPopular({'sort': 'created_at', 'rpp': '100'},  function(error, results) {
  if (error) {
    console.log('error', results);
    return;
  }
  console.log(results);
});
*/
