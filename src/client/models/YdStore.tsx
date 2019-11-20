import { createContext } from 'react'
import { decorate, observable } from 'mobx'

interface User {
  username: string,
  password: string
}

export class Ydstore {
  token: string = window.localStorage['token']

  async login(user: User): string {
    const { username, password } = user
    if (username !== 'admin' || password !== 'admin') {
      throw new Error('用户名或密码错误')
    }

    this.token = Math.random().toString()
    this.userInfo = { name: '小疯子' }

    return this.token
  }

  logout(): void {
    window.localStorage['token'] = ''
  }
}

decorate(Ydstore, {
  token: observable,
  userInfo: observable,
})

export default createContext(new Ydstore())
