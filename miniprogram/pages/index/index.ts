import { ProfileService } from "../../service/profile";
import { rental } from "../../service/proto_gen/rental/rental_pb";
import { tripService } from "../../service/trip";
import { routing } from "../../utils/routing";

Page({
	isPageShowing: false,
	socket: undefined as WechatMiniprogram.SocketTask | undefined,

	location: {
		latitude: 22.71991,
		longitude: 114.24779
	},
	data: {
		avatarURL: '',
		setting: {
			skew: 0,
			rotate: 0,
			showLocation: true,
			showScale: true,
			subKey: '',
			layerStyle: 1,
			enableZoom: true,
			enableScroll: true,
			enableRotate: false,
			showCompass: false,
			enable3D: false,
			enableOverlooking: false,
			enableSatellite: false,
			enableTraffic: false,
		},
		location: {
			latitude: 22.71991,
			longitude: 114.24779,
		},
		scale: 10,
		markers: [{
			iconPath: "/resources/car.png",
			id: 0,
			latitude: 23.099994,
			longitude: 113.324520,
			width: 50,
			height: 50
		},
		{
			iconPath: "/resources/car.png",
			id: 1,
			latitude: 23.099994,
			longitude: 114.324520,
			width: 50,
			height: 50
		},
		]
	},

	onLoad() {
		this.socket = wx.connectSocket({
			url: "ws://localhost:9090/ws"
		})
		let msgReceived = 0
		this.socket?.onMessage(msg => {
			msgReceived++
			console.log(msg)
		})

		setInterval(() => {
			this.socket?.send({
				data: JSON.stringify({
					msg_received: msgReceived,
				})
			})
		},3000)


		let that = this
		wx.getStorage({
			key: 'userInfo',
			success(res) {
				that.setData({
					avatarURL: res.data.avatarUrl,
				})
			},
			fail: function (err) {
				console.log(err);
			},
		})
	},

	onMyLocationTap() {
		this.socket?.close({
			reason:"main",
		})
		//wx.closeSocket()
		wx.getLocation({
			type: 'gcj02',
			success: res => {
				this.setData({
					location: {
						latitude: res.latitude,
						longitude: res.longitude,
					},
				})
				console.log(this.data.location)
			},
			fail: () => {
				wx.showToast({
					icon: 'none',
					title: '请前往设置页授权'
				})
			}
		})
	},

	async onScanTap() {
		const trips = await tripService.getTrips(rental.v1.TripStatus.IN_PROGRESS)
		if ((trips.trips?.length || 0) > 0) {
			wx.showModal({
				title: "行程中",
				content: "当前有正在进行的行程，将跳转到行程页面",
				success: (res) => {
					if (res.confirm) {
						console.log("用户点击确定")
						wx.navigateTo({
							url: routing.driving({
								trip_id: trips.trips![0].id!,
							})
						})
					} else if (res.cancel) {
						console.log("用户点击取消")
					}
				}
			})
			// wx.navigateTo({
			// 	url:routing.driving({
			// 		trip_id:trips.trips![0].id!,
			// 	})
			// })
			// return
		} else {
			wx.scanCode({
				success: async () => {
					//模拟汽车
					const carID = "6363f1158cdd97be8c37c998"
					const lockURL = routing.lock({
						car_id: carID,
					})
					const prof = await ProfileService.getProfile()
					if (prof.identityStatus === rental.v1.IdentityStatus.VERIFIED) {
						wx.navigateTo({
							url: lockURL
						})
					} else {
						wx.showModal({
							title: "身份认证",
							content: "需要身份认证才能租车",
							success: (res) => {
								if (res.confirm) {
									console.log('用户点击确定')
									wx.navigateTo({
										//url: `/pages/register/register?redirect=${encodeURIComponent(redirectURL)}`
										url: routing.register({
											redirectURL: lockURL,
										})
									})
								} else if (res.cancel) {
									console.log("用户点击取消")
								}
							},
						})
					}

				},
				fail: console.error,
			})
		}


	},


	onShow() {
		this.isPageShowing = true;
		let that = this
		wx.getStorage({
			key: 'userInfo',
			success(res) {
				that.setData({
					avatarURL: res.data.avatarUrl,
				})
			},
			fail: function (err) {
				console.log(err);
			},
		})
	},
	onHide() {
		this.isPageShowing = false;
	},

	onMyTripsTap() {
		wx.navigateTo({
			url: routing.mytrips()
		})
	},

	moveCars() {
		const map = wx.createMapContext("map")
		// const dest = {
		// 	latitude: 23.099994,
		// 	longitude: 113.324520
		// }

		const moveCar = () => {
			this.location.latitude += 0.1
			this.location.longitude += 0.1
			map.translateMarker({
				destination: {
					latitude: this.location.latitude,
					longitude: this.location.longitude,
				},
				markerId: 0,
				autoRotate: false,
				rotate: 0,
				duration: 5000,
				animationEnd: () => {
					if (this.isPageShowing) {
						moveCar()
					}
				},
			})
		}
		moveCar()
	}
})