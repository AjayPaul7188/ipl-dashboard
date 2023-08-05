import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    teamsData: [],
  }

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const formattedData = data.teams.map(eachTeam => ({
      name: eachTeam.name,
      id: eachTeam.id,
      teamImageUrl: eachTeam.team_image_url,
    }))

    console.log(formattedData)

    this.setState({
      teamsData: formattedData,
      isLoading: false,
    })
  }

  render() {
    const {isLoading, teamsData} = this.state

    return (
      <div className="ipl-dashboard">
        <div className="title-logo">
          <img
            className="ipl-logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="main-heading">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <ul className="team-card-container">
            {teamsData.map(eachOne => (
              <TeamCard teamDetails={eachOne} key={eachOne.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home
