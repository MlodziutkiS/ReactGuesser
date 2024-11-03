import './Guesser.css';
import SlideShow from './SlideShow';
import Mode from './Mode';
import { GuesserProvider } from './GuesserContextProvider.jsx';
import Zgadywarka from './Zgadywarka.jsx';
function Guesser(){
    return(
    <div className='menu'>
        <GuesserProvider>
            <section className="Selector">
                <Mode/>
            </section>
            <section className="Game">
                <SlideShow/>
                <Zgadywarka/>
            </section>
        </GuesserProvider>
    </div>
    );
}
export default Guesser;