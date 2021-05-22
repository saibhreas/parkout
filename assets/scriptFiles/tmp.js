string[] retreive = {'a', 'b', 'c', 'd','e', 'f'};
var parkList= $('park-list>');

function testPlacement(retreived){
  for (var i = 0; retreived.length < 6; i++) {
      parkList= retreive[i];
      console.log(parkList);
      };
    };
  testPlacement();
