'use strict';

var firstImageElement = document.getElementById('first-img');
var secondImageElement = document.getElementById('second-img');

var firstImageIndex ;
var firstImageIndex ;


function ImsgesGame(name , source){
this.name=name;
this.source=source;

ImsgesGame.prototype.allImages.push(this);
}

ImsgesGame.prototype.allImages=[];

new ImsgesGame ('Number 1' , 'img/num1.gif');
new ImsgesGame ('Number 2' , 'img/num2.jpg');
new ImsgesGame ('Number 3' , 'img/num3.jpg');
new ImsgesGame ('Number 4' , 'img/num4.jpg');

function renderTwoImages(){
for (var i=0 ; i < ImsgesGame.prototype.allImages.lenght ; i++){
firstImageElement[i] ;
secondImageElement[i+1];

}
}
renderTwoImages();