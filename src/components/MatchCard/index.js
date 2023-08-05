import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = matchDetails

  const matchStatusClass = matchStatus === 'Lost' ? 'match-lost' : 'match-won'

  return (
    <li className="each-list">
      <img
        className="recent-match-logo"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <h1 className="recent-match-name">{competingTeam}</h1>
      <p className="recent-match-result">{result}</p>
      <p className={matchStatusClass}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
