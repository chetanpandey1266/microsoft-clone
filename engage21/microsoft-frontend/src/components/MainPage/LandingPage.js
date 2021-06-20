import React from 'react'
import '../../styles/landingPage.css'
import landingPgRight from '../../images/landingPage/landingpg_01.jpeg'
import work from '../../images/landingPage/landingpg_work.png';
import home from '../../images/landingPage/landingpg_home.jpeg';
import school from '../../images/landingPage/landingpg_school.jpeg';
import {Link} from 'react-router-dom'

function LandingPage() {
    return (
        <div>
            <div className="landingPage-front">
                <div className="landingPage-front-leftside">
                    <h1>Microsoft Teams</h1>
                    <h3>Meet, chat, call and collaborate in just one place</h3>
                    <div className="landingPage-front-loginup">
                        <Link to="/signup01" style={{textDecoration:"none"}}><div className="landingPage-front-logup">Sign up for free</div></Link>
                        <Link to="/signin01" style={{textDecoration:"none"}}><div className="landingPage-front-login">Sign in</div></Link>
                    </div>
                </div>
                <div className="landingPage-front-rightside">
                    <img src={landingPgRight} alt=""/>
                </div>
            </div>
            <div className="landingPage-middle">
                <div className="landingPage-middle-txt">
                    <h1>Microsoft Teams is for Everyone</h1>
                    <p>Whether it’s chat, calls, or video, anyone can engage at any time, bringing everyone closer.</p>
                    <p>Your docs, photos, videos, chat history, and meeting notes are always there, so it’s easier to work together.</p>
                    <p>Set up your team’s space with all the apps you need so you can stay in just one place instead of jumping around</p>
                </div>
                <div className="landingPage-middle-img">
                    <div className="landingPage-middle-img1-work">
                        <img src={work}  alt="work"></img>
                    </div>
                    <div className="landingPage-middle-img2">
                        <div className="landingPage-middle-img2-home">
                            <img src={home}  alt="home"></img>
                        </div>
                        <div className="landingPage-middle-img2-school">
                            <img src={school} alt="school"></img>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="landingPage-end">

            </div>
            <div className="footer">

            </div>
        </div>
    )
}

export default LandingPage
