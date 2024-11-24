import { useState , useEffect} from "react";
import "../Info/Info.css";


function Info(){

const [leaderMode1, setLead1]=useState(undefined);
const [leaderMode2, setLead2]=useState(undefined);

useEffect(()=>{
    setLead1(undefined);
    setLead2(undefined);
    let id=1;
    let url="/api/leaderboard"+id;
    fetch(url).then(
      response => response.json()
    ).then(
      data => setLead1(data)
    )
    id=2;
    url="/api/leaderboard"+id;
    fetch(url).then(
        response => response.json()
      ).then(
        data => setLead2(data)
      )
  },[])

  if(leaderMode1===undefined || leaderMode2===undefined){
    return(<p>Loading...</p>)
  }


    return (
        <div id="Panel">
        <aside className="leaderboardItems">
        Smieszny projekt, na ktory wpadlismy z ziomkiem, <br/>obiecalismy sobie, ze damy z siebie max 30%. <br/>kontakt discord: cztery5<br/>
        Jako mlodziutki spocilem sie niezle +- 31.1% i jest teraz w reakcie
        </aside>
        <aside>
            <div className="leaderboardItems">
                <p>Leaders of Strict Mode</p>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>username</th>
                            <th>score</th>
                        </tr>
                    </thead>
                    <tbody>
                    {leaderMode1.map((lead,index)=>
                    <tr key={index} className={index%2===0? 'evenClass': 'oddClass'}>
                        <td>{index+1}</td>
                        <td style={{width:'10em'}}>{lead.user}</td>
                        <td>{lead.score}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="leaderboardItems">
                <p>Leaders of Handlarzyk Mode</p>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>username</th>
                            <th>score</th>
                        </tr>
                    </thead>
                    <tbody>
                    {leaderMode2.map((lead,index)=> 
                    <tr key={index} className={index%2===0? 'evenClass': 'oddClass'}>
                        <td>{index+1}</td>
                        <td style={{width:'10em'}}>{lead.user}</td>
                        <td>{lead.score}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        </aside>
        </div>
    );
}
export default Info;