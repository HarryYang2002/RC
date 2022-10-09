import { IAppOption } from "../../appoption";
import { tripService } from "../../service/trip";
import { routing } from "../../utils/routing";

const shareLocationKey = "share_Location"
Page({
	data: {
		userInfo: {},
		hasUserInfo: false,
		canIUseGetUserProfile: false,
		shareLocation: true,
		avatarURL: '',
	},
	async onLoad(opt: Record<"car_id", string>) {
		const o: routing.LockOpts = opt
		console.log("unlocking car", o.car_id);
		let that = this
		await wx.getStorage({
			key: 'userInfo',
			success(res) {
				that.setData({
					userInfo: res.data,
					hasUserInfo: true,
					canIUseGetUserProfile: true
				})
			},
			fail: function (err) {
				that.setData({
					canIUseGetUserProfile: true
				})
				console.log(err);
			},
		})
		await wx.getStorage({
			key: shareLocationKey,
			success(res) {
				that.setData({
					shareLocation: res.data,
				})
			},
			fail(err) {
				console.log(err);
			}
		})
	},

	getUserProfile() {
		// 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
		// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		wx.getUserInfo
		wx.getUserProfile({
			desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (res) => {
				const userInfo: WechatMiniprogram.UserInfo = res.userInfo
				console.log(res.userInfo);
				getApp<IAppOption>().resolveUserInfo(userInfo);
				this.setData({
					userInfo: userInfo,
					hasUserInfo: true,
					avatarURL: userInfo.avatarUrl,
				});
				wx.setStorageSync("userInfo", userInfo);

				let setNowTime = Date.now() + 3600 * 1000 * 24 * 30;  // 设置了30天有效期
				wx.setStorageSync("userInfoStorageTime", setNowTime);
			},
			fail: function (err) {
				console.log(err);
			},
		})
	},
	onShareLocation(e: any) {
		const shareLocation: boolean = e.detail.value
		console.log(shareLocation);
		wx.setStorageSync(shareLocationKey, shareLocation);
	},
	onUnlockTap() {
		wx.getLocation({
			type: "gjc02",
			success: loc => {
				console.log("starting a trip", {
					location: {
						latitude: loc.latitude,
						longitude: loc.longitude,
					},
					avatarURL: this.data.shareLocation
						? this.data.avatarURL : '',
				})

				tripService.CreateTrip({
					start:"abc",
				})
				return
				const tripID = "trip456";

				wx.showLoading({
					title: "开锁中",
					mask: true,
				})
				setTimeout(() => {
					wx.redirectTo({
						// url: `/pages/driving/driving?trip_id=${tripID}`,
						url: routing.driving({
							trip_id: tripID,
						}),
						complete: () => {
							wx.hideLoading()
						}
					})
				}, 2000);
			},
			fail: () => {
				wx.showToast({
					icon: 'none',
					title: '请前往设置页授权位置信息'
				})
			}
		})
	},
})