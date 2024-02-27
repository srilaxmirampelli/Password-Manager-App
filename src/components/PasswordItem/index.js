import {useState} from 'react'
import './index.css'

const PasswordItem = props => {
  const {passwordDetails, deletePassword, isActive} = props
  const {id, website, username, password} = passwordDetails
  const userInitial = username[0]
  const starsUrl =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'
  const onClickDeleteIcon = () => {
    deletePassword(id)
  }
  const bgColorsList = ['#f59e0b', '#10b981', '#f97316', '#14b8a6', '#b91c1c']
  const randomIndex = Math.floor(Math.random() * bgColorsList.length)
  const randomBgColor = bgColorsList[randomIndex]
  const [backgroundColor, setBackgroundColor] = useState(randomBgColor)

  return (
    <li className="password-item">
      <div className="password-details-container">
        <p className="user-initial" style={{backgroundColor}}>
          {userInitial}
        </p>

        <div className="password-details-sub-container">
          <p className="password-detailed-info">{website}</p>
          <p className="password-detailed-info">{username}</p>

          {isActive ? (
            <p className="password-detailed-info">{password}</p>
          ) : (
            <img src={starsUrl} alt="stars" className="stars-img" />
          )}
        </div>
      </div>
      <button
        className="delete-btn"
        type="button"
        onClick={onClickDeleteIcon}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
