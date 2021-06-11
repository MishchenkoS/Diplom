import React, { useContext, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useHttp } from "../../hooks/httpHooks";
import { Loader } from "../Loader";

export const TournamentInfo = (arg) => {
  const {tournament, game, rounds, leadings, players} = arg;
  console.log(tournament, 'tournament')
  console.log(game, 'game');
  console.log(rounds, 'rounds');
  const {token, role} = useContext(AuthContext);
  const {request, loading} = useHttp();

  const getBalls = useCallback(() => {
    const content = [];
    for(let key in tournament.balls) {
      const user = players.find(item => item.id === key);
      console.log(user, 'user')
      console.log(players, 'players')
      content.push(<p><Link to={`/users/user/${user._id}`}>{user.login}</Link> : {tournament.balls[key]}</p>)
    }
    return content;
  }, [players])

  return ( 
  <>
  <p>Статус турнира: {tournament.status}</p>
  <p>Название игры: <Link to={`/games/game/${game._id}`}>{game.nameGame}</Link></p>
  <p>Дата проведения турнира: {new Date(tournament.created_date).toLocaleDateString()}</p>
  <div>
    <p>Очки за турнир:</p>
    {getBalls()}
  </div>

  <div>
    {rounds.map((round, index) => {
      const roundDOM = [<p>Раунд №{index+1}</p>];
      round.map((item)=>{

        roundDOM.push(<Link to={`/tests/test/${item.testId._id}`}>Тест : </Link>);
        roundDOM.push(<p>Вопрос : {item.testId.question}</p>);
        for(let key in item.testId.answers) {
          console.log(item, 'item')
          console.log(key, 'key')
          const indexTrue = item.testId.true_answers.indexOf(item.testId.answers[key]);
          console.log(item.testId.answers[key], 'item.answers[key]');
          console.log(indexTrue, 'indexTrue')
          if(indexTrue !== -1) {
            console.log('if')
            roundDOM.push(<li><b>{item.testId.answers[key]}</b></li>);
          } else {
            console.log('else')
            roundDOM.push(<li>{item.testId.answers[key]}</li>);
          }
        }
        roundDOM.push(<p>Ответы игроков : </p>);
        console.log(item.responders, 'item.responders');
        for(let key of item.responders){
          const user = players.find(key1 => key1.id === key);
          console.log(players)
          console.log(key, 'key')
          roundDOM.push(<p><Link to={`/users/user/${user.id}`}>{user.login}</Link> : {item.answers[key]}</p>);
        }
      });
      return roundDOM;
    })}
  </div>
  

  </>
  )


}

// export const TournamentInfo = ({ tournament }) => {
//   // console.log(tournament)
//   const {token} = useContext(AuthContext);
//   const {request, loading} = useHttp();
//   const [game, setGame] = useState(null);
//   const [rounds, setRounds] = useState([]);
//   const [responders, setResponders] = useState([]);

 

//   const getGame = useCallback ( async (id) => {
//     try {

//       const fetched = await request(`/api/games/game/${id}`, "GET", null, {
//         Authorization: `Bearer ${token}`
//       });
  
//       setGame(fetched.game);
      
//     } catch(error) {

//     }
//   }, [token, request]);

//   const getResponder = useCallback(async(id) => {
//     console.log('getResponder')
//     const fetched = await request(`/api/users/me/admin/${id}`, "GET", null, {
//       Authorization: `Bearer ${token}`
//     });
//     console.log(fetched)
//     setResponders([...responders, fetched.user.login])
//   }, [token, request]);

//   const getRounds = useCallback(async (testId, respondersRound, answers) => {
//     try {
//       // setResponders([]);
//       const test = await request(`/api/tests/${testId}`, "GET", null, {
//         Authorization: `Bearer ${token}`
//       });

//       console.log("testId", testId)
//       console.log('responders', respondersRound);
//       respondersRound.map(async (item) => {
//         console.log('respondersRound.map')
//         await getResponder(item);
//       });

//       console.log("resName",responders)

//       const obj = { };

//       for(let key in answers){
//         const index = responders.indexOf(key);
//         const name = responders[index]
//         obj[name] = answers[key];
//       }

//       const object = {
//         test: test.test,
//         responders,
//         answers: obj
//       }

//       setRounds([...rounds, object]);
//       console.log(rounds)
      
//     } catch(error) {

//     }
//   }, [token, request, getResponder]);

//   useEffect(() => {
//     getGame(tournament.gameId);

//     tournament.rounds.map((item1) => {
//       item1.map((item2) => {
//         // setResponders([]);
//         getRounds(item2.testId, item2.responders, item2.answers)
//       })
//     })

//   }, [getGame, getRounds, getResponder]);

  
//   if(loading || !game || responders.length === 0) {
//     return <Loader></Loader>
//   }


//   return (
//     <>
//       <h2>Турнир</h2>
//       <p>Статус: {tournament.status}</p>
//       <p>Название игры: {game.nameGame}</p>
      




//       {/* <h2>Тест</h2>
  
//       <p>Сложность: {tournament.complexity}</p>
//       <p>Тип: {tournament.type}</p>
//       <p>Вопрос: {tournament.question}</p>
//       {tournament.img_question &&
//       <img src={`${tournament.img_question}`}></img>
//       }

      


//       <p>Варианты ответа: 
//         {test.answers.map((item, index) => {
//           if(test.true_answer.includes(item)) {
//             return (
//             <li key={`${index}`}>
//               {test.img_answers[index] && 
//               <img src={`${test.img_answers[index]}`}></img>}
//               <b>{item}</b>
//             </li>
//           );}
//           return (
//             <li key={`${index}`}>
//               {test.img_answers[index] && 
//               <img src={`${test.img_answers[index]}`}></img>}
//               {item}
//             </li>
//           );
//         })}
//       </p> */}
//       {/* <p>Дата создания: <strong>{new Date(test.created_date).toLocaleDateString()}</strong></p> */}
//     </>
//   );
  
// }