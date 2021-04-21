const { Tournament } = require('../models/tournamentModel');

module.exports.findTournaments = async () => {
  const tournaments = await Tournament.find({})
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournaments || tournaments.length === 0) {
    throw new Error('No tournaments found');
  }
  return tournaments;
};

module.exports.findTournamentById = async (id) =>  {
  const tournament = await Tournament.findById(id)
    .catch((err) => {
      console.error(err.message);
    });

  if (!tournament) {
    throw new Error('No tournament found');
  }
  return tournament;
}