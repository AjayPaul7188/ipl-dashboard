import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamBannerImage: '',
    latestMatchData: {},
    recentMatches: [],
    backgroundColor: '',
  }

  componentDidMount() {
    this.getTeamMatchDetails()
  }

  getTeamMatchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    let bgColorClass = ''
    if (id === 'RCB') {
      bgColorClass = 'rcb-bg'
    } else if (id === 'KKR') {
      bgColorClass = 'kkr-bg'
    } else if (id === 'KXP') {
      bgColorClass = 'kxp-bg'
    } else if (id === 'CSK') {
      bgColorClass = 'csk-bg'
    } else if (id === 'RR') {
      bgColorClass = 'rr-bg'
    } else if (id === 'MI') {
      bgColorClass = 'mi-bg'
    } else if (id === 'SH') {
      bgColorClass = 'sh-bg'
    } else if (id === 'DC') {
      bgColorClass = 'dc-bg'
    }

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const teamGroupPicture = data.team_banner_url

    const latestMatch = data.latest_match_details
    const lastMatch = {
      umpires: latestMatch.umpires,
      result: latestMatch.result,
      manOfTheMatch: latestMatch.man_of_the_match,
      id: latestMatch.id,
      date: latestMatch.date,
      venue: latestMatch.venue,
      competingTeam: latestMatch.competing_team,
      competingTeamLogo: latestMatch.competing_team_logo,
      firstInnings: latestMatch.first_innings,
      secondInnings: latestMatch.second_innings,
      matchStatus: latestMatch.match_status,
    }

    const prevMatchesData = data.recent_matches.map(eachOne => ({
      umpires: eachOne.umpires,
      result: eachOne.result,
      manOfTheMatch: eachOne.man_of_the_match,
      id: eachOne.id,
      date: eachOne.date,
      venue: eachOne.venue,
      competingTeam: eachOne.competing_team,
      competingTeamLogo: eachOne.competing_team_logo,
      firstInnings: eachOne.first_innings,
      secondInnings: eachOne.second_innings,
      matchStatus: eachOne.match_status,
    }))

    this.setState({
      teamBannerImage: teamGroupPicture,
      latestMatchData: lastMatch,
      recentMatches: prevMatchesData,
      backgroundColor: bgColorClass,
      isLoading: false,
    })
  }

  renderTeamMatches = () => {
    const {
      teamBannerImage,
      latestMatchData,
      recentMatches,
      backgroundColor,
    } = this.state

    return (
      <div className={`team-matches-container ${backgroundColor}`}>
        <img className="banner" src={teamBannerImage} alt="team banner" />

        <p className="sub-head">Latest Matches</p>
        <LatestMatch
          latestMatchDetails={latestMatchData}
          key={latestMatchData.id}
        />

        <ul className="recent-matches-container">
          {recentMatches.map(eachMatch => (
            <MatchCard matchDetails={eachMatch} key={eachMatch.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

export default TeamMatches
