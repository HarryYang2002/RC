//app.ts
import camelcaseKeys = require("camelcase-keys")
import { IAppOption } from "./appoption"
import { auth } from "./service/proto_gen/auth/auth_pb"
import { rental } from "./service/proto_gen/rental/rental_pb"
import { SZTURC } from "./service/request"
import { getSetting, getUserInfo } from "./utils/wxapi"

let resolveUserInfo: (value: WechatMiniprogram.UserInfo | PromiseLike<WechatMiniprogram.UserInfo>) => void
let rejectUserInfo: (reason?: any) => void

// app.ts
App<IAppOption>({
  globalData: {
    userInfo: new Promise((resolve, reject) => {
      resolveUserInfo = resolve
      rejectUserInfo = reject
    }),
  },

  async onLaunch() {
    // wx.request({
    //   url: "http://localhost:8080/trip/trip123",
    //   method: "GET",
    //   success: res => {
    //     const getTripRes = server.GetTripResponse.fromObject(camelcaseKeys(res.data as object,{
    //       deep: true,
    //     }))
    //     console.log(getTripRes)
    //     //TODO: 下面这行只是测试，上线时应该用if来做一层保护
    //     console.log("status is ",server.TripStatus[getTripRes.trip?.status!])
    //   },
    //   fail: console.error,
    // })
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    SZTURC.login()
    // wx.login({
    //   success: res => {
    //     console.log(res.code)
    //     wx.request({
    //       url: "http://localhost:8080/v1/auth/login",
    //       method: "POST",
    //       data: {
    //         code: res.code,
    //       } as auth.v1.ILoginRequest,
    //       success: res => {
    //         const loginResp: auth.v1.ILoginResponse = auth.v1.LoginResponse.fromObject(
    //           camelcaseKeys(res.data as object),
    //         )
    //         console.log(loginResp)
    //         wx.request({
    //           url: "http://localhost:8080/v1/trip",
    //           method: "POST",
    //           data: {
    //             start:"abc",
    //           } as rental.v1.ICreateTripRequest,
    //           header: {
    //             authorization:"Bearer " + loginResp.accessToken,
    //           }
    //         })
    //       },
    //       fail: console.error,
    //     })
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // })
    // 获取用户信息
    try {
      const setting = await getSetting()
      if (setting.authSetting['scope.userInfo']) {
        const userInfoRes = await getUserInfo()
        resolveUserInfo(userInfoRes.userInfo)
      }
    } catch (err) {
      rejectUserInfo(err)
    }
  },
  resolveUserInfo(userInfo: WechatMiniprogram.UserInfo) {
    resolveUserInfo(userInfo)
  }
})
