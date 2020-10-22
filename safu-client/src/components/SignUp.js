//Signup.js - state에 따라 or 라우팅에 따라) 변경되는 부분: x

import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useremail: '',
      password: '',
      passwordCheck: '',
      githubId: '',
      isAvailedEmail: '',
      isAvailedPassword: '',
      isAvailedPasswordCheck: '',
    };
  }
  handleSignUpValue = (key) => (e) => {
    if (key === 'useremail') {
      var emailreg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      var useremail = e.target.value;
      this.setState({ [key]: useremail });
      if (useremail.length > 0 && false === emailreg.test(useremail)) {
        this.setState({ isAvailedEmail: '올바른 이메일 형식이 아닙니다.' });
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:4000/users/signup/checkId',
          data: {
            useremail: e.target.value,
          },
        })
          .then((res) => {
            if (res.data !== null) {
              this.setState({ isAvailedEmail: '이미 존재하는 email입니다.' });
            } else {
              this.setState({ isAvailedEmail: '' });
              this.setState({ [key]: useremail });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
    if (key === 'password') {
      var reg = /^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
      var password = e.target.value;
      if (password.length > 0 && false === reg.test(password)) {
        this.setState({
          isAvailedPassword: '비밀번호는 8자 이상이어야 하며, 숫자/소문자를 모두 포함해야 합니다.',
        });
      } else {
        this.setState({ isAvailedPassword: '' });
        this.setState({ [key]: e.target.value });
      }
    }
    if (key === 'passwordCheck') {
      var passwordCheck = e.target.value;
      if (passwordCheck.length > 0 && this.state.password !== passwordCheck) {
        this.setState({ isAvailedPasswordCheck: '비밀번호가 일치하지 않습니다.' });
      } else {
        this.setState({ isAvailedPasswordCheck: '' });
        this.setState({ [key]: e.target.value });
      }
    }
    if (key === 'githubId') {
      this.setState({ [key]: e.target.value });
    }
  };
  handleSignUpButton = () => {
    if (
      this.state.isAvailedEmail === '' &&
      this.state.isAvailedPassword === '' &&
      this.state.isAvailedPasswordCheck === ''
    ) {
      axios({
        method: 'post',
        url: 'http://localhost:4000/users/signup',
        data: {
          useremail: this.state.useremail,
          password: this.state.password,
          githubId: this.state.githubId,
        },
      })
        .then((res) => {
          //200(OK), 201(Created)
          // this.props.history.push('/users/login');
          console.log('회원가입 완료');
        })
        .catch((err) => {
          //500(err)
          console.error(err);
        });
    } else {
      alert('필수조건을 만족해 주셔야 합니다.');
    }
  };
  render() {
    const { history } = this.props;
    return (
      <div>
        <ul>
          <li>
            <label htmlFor="useremail">
              <div>email</div>
              <input type="useremail" onChange={this.handleSignUpValue('useremail')}></input>
              <div>{this.state.isAvailedEmail}</div>
            </label>
          </li>
          <li>
            <label htmlFor="password">
              <div>password</div>
              <input type="password" onChange={this.handleSignUpValue('password')}></input>
              <div>{this.state.isAvailedPassword}</div>
            </label>
          </li>
          <li>
            <label htmlFor="password check" onChange={this.handleSignUpValue('passwordCheck')}>
              <div>password 확인</div>
              <input type="password"></input>
              <div>{this.state.isAvailedPasswordCheck}</div>
            </label>
          </li>
          <li>
            <label htmlFor="Github ID" onChange={this.handleSignUpValue('githubId')}>
              <div>Github ID (for identification)</div>
              <input></input>
            </label>
          </li>
        </ul>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              {
                this.handleSignUpButton();
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

// export default withRouter(SignUp);
export default SignUp;