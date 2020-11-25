import React, { Component } from 'react'
import oauth from 'yach-oauth-jssdk'
import './index.css'

export default class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      downloadPageUrl: '',
      appId: '1616119075',
      state: 'testStr',
    }
  }

  getYachAppDownloadPageUrl = type => {
    let href = oauth.getYachAppDownloadPageUrl({
      type,
    })
    href = href.replace('yach', 'yach-test')
    this.setState(
      {
        downloadPageUrl: href,
      },
      () => {
        window.location.href = href
      },
    )
  }

  navigateToYachAppAuth = () => {
    const { appId, state } = this.state;
    oauth.navigateToYachAppAuth({
      appId,
      state,
    })
  }

  changeInputValue = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { downloadPageUrl, appId, state } = this.state
    return (
      <div>
        <div style={{ border: '4px solid red', padding: '10px' }}>
          <p>跳转下载页面地址：{downloadPageUrl}</p>
          <button onClick={this.getYachAppDownloadPageUrl}>正常下载页面地址</button>
          <button onClick={this.getYachAppDownloadPageUrl.bind(this, '1')}>提示未安装页面地址</button>
          <button onClick={this.getYachAppDownloadPageUrl.bind(this, '2')}>提示版本低页面地址</button>
        </div>

        <div style={{ marginTop: '30px', border: '4px solid green', padding: '10px' }}>
          <div className="inputWrap">
            appId: <input type="text" value={appId} name="appId" onChange={this.changeInputValue} placeholder="必传" />
          </div>
          <div className="inputWrap">
            state:
            <input type="text" value={state} name="state" onChange={this.changeInputValue} placeholder="非必传" />
          </div>
          <div className="inputWrap">
            scope: <input type="text" value="userinfo" disabled readOnly />
          </div>
          <div className="inputWrap">
            action: <input type="text" value="auth" disabled readOnly />
          </div>
          <button onClick={this.navigateToYachAppAuth}>授权</button>
        </div>
      </div>
    )
  }
}
