import React from 'react'
import globe from '../../images/footer.png'
import '../../styles/footer.css'
function Footer() {
    return (
        <div className="footer-main">
            <div className="footer-main-left">
                <img src={globe} alt=""/> 
                <p>  English</p>
            </div>
            <div className="footer-main-right">
                <p>
                    Developed by Chetan 💙
                </p>
            </div>
            
        </div>
    )
}

export default Footer
