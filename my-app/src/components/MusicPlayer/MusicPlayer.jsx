import React from 'react';
function MusicPlayer(){
    return(
            <audio id="myAudio" controls autoPlay loop>
                <source src='.\Music\PowerKids-TwojAniolStroz.mp3' type="audio/mpeg"/>
                Twoja przeglądarka nie obsługuje elementu audio.
            </audio>
    );
}
export default MusicPlayer;