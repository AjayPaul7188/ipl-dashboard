// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    umpires,
    result,
    manOfTheMatch,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
  } = latestMatchDetails

  return (
    <div className="latest-match-container">
      <div className="sub-div">
        <p className="team-name">{competingTeam}</p>
        <p className="date">{date}</p>
        <p className="venue-result">{venue}</p>
        <p className="venue-result">{result}</p>
      </div>

      <div className="sub-div">
        <img
          className="competing-logo"
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
        />
      </div>

      <div className="sub-div">
        <h2 className="sub-details">First Innings</h2>
        <p className="values">{firstInnings}</p>

        <h2 className="sub-details">Second Innings</h2>
        <p className="values">{secondInnings}</p>

        <h2 className="sub-details">Man of The Match</h2>
        <p className="values">{manOfTheMatch}</p>

        <p className="sub-details">Umpires</p>
        <p className="values">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
