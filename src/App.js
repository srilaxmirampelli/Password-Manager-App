import './App.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from './components/PasswordItem'

class App extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    searchPassword: '',
    showPasswords: false,
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchPasswordInput = event => {
    this.setState({
      searchPassword: event.target.value,
    })
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    const newPassword = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      isShowPasswordsActive: false,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  renderAddPasswordCard = () => {
    const {websiteInput, usernameInput, passwordInput} = this.state
    return (
      <div className="add-password-card">
        <h1 className="card-heading">Add New Password</h1>
        <form onSubmit={this.onAddPassword}>
          <div className="input-element-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
              className="input-element-icon"
            />
            <input
              type="text"
              placeholder="Enter Website"
              className="input-element"
              onChange={this.onChangeWebsiteInput}
              value={websiteInput}
            />
          </div>
          <div className="input-element-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
              className="input-element-icon"
            />
            <input
              type="text"
              placeholder="Enter Username"
              className="input-element"
              onChange={this.onChangeUsernameInput}
              value={usernameInput}
            />
          </div>
          <div className="input-element-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
              className="input-element-icon"
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="input-element"
              onChange={this.onChangePasswordInput}
              value={passwordInput}
            />
          </div>
          <div className="add-btn-container">
            <button
              className="add-btn"
              type="submit"
              onClick={this.onAddPassword}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    )
  }

  getSearchedResults = () => {
    const {passwordsList, searchPassword} = this.state

    // Filter passwords based on search input
    return passwordsList.filter(
      eachPassword =>
        eachPassword.website
          .toLowerCase()
          .includes(searchPassword.toLowerCase()) ||
        eachPassword.username
          .toLowerCase()
          .includes(searchPassword.toLowerCase()),
    )
  }

  renderNoPasswordsImg = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-img"
      />
      <p className="card-heading">No Passwords</p>
    </div>
  )

  renderAllPasswords = searchedResults => {
    const {showPasswords} = this.state
    return (
      <div>
        <ul className="password-list">
          {searchedResults.map(password => (
            <PasswordItem
              key={password.id}
              passwordDetails={password}
              deletePassword={this.deletePassword}
              isActive={showPasswords}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderYourPasswordsCard = () => {
    const {searchPassword} = this.state
    const searchedResults = this.getSearchedResults()

    return (
      <div className="your-passwords-container">
        <div className="password-search-container">
          <div className="password-count-container">
            <h1 className="password-text">Your Passwords</h1>
            <p className="password-count"> {searchedResults.length}</p>
          </div>
          <div className="search-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="search-icon"
            />
            <input
              type="search"
              placeholder="Search"
              className="input-element"
              value={searchPassword}
              onChange={this.onChangeSearchPasswordInput}
            />
          </div>
        </div>
        <hr className="hr-line" />
        <div className="show-passwords-container">
          <input
            type="checkbox"
            className="checkbox"
            id="showPasswords"
            onClick={this.onClickShowPasswords}
          />
          <label className="password-text" htmlFor="showPasswords">
            Show passwords
          </label>
        </div>
        {searchedResults.length === 0
          ? this.renderNoPasswordsImg()
          : this.renderAllPasswords(searchedResults)}
      </div>
    )
  }

  onClickShowPasswords = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachPassword => eachPassword.id !== id,
      ),
    }))
  }

  render() {
    return (
      <div className="app-container">
        <div className="password-manager-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="app-logo"
            />
          </div>
          <div className="add-password-container">
            <div className="password-manager-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="password-manager-img"
              />
            </div>
            {this.renderAddPasswordCard()}
          </div>
          {this.renderYourPasswordsCard()}
        </div>
      </div>
    )
  }
}

export default App
