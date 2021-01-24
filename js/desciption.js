'use strict'

function superhero (name,bio,power){
	
        this.name = name;
        this.bio=bio;
        this.power=power;
        superhero.prototype.allsuperhero.push(this);
    }
    var batman= new superhero('Batman',	'It’s difficult to think of any superhero who is loved more than Bruce Wayne’s alter-ego. He remains one of the most popular superheroes around over 70 years since his first incarnation in 1939, arriving not long after the creation of the first Marvel superhero, the Sub-Mariner.  The character has come a long way from the ‘Boom!’ ‘Pow’ slapstick style of the 60’s and a new trilogy of Batman films are currently in production with Twilight star Robert Pattinson starring as the man in the winged latex suit.',
    'high tech gear, martial arts, and high intelligence' );

window.addEventListener('load',function()
{
    
})