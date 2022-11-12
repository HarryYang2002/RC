import { CarService } from "../../service/car";
import { ProfileService } from "../../service/profile";
import { rental } from "../../service/proto_gen/rental/rental_pb";
import { tripService } from "../../service/trip";
import { routing } from "../../utils/routing";


interface Marker {
	iconPath: string
	id: number
	latitude: number
	longitude: number
	width: number
	height: number
}

const defaultAvatar = "/resources/car.png"
const initialLat = 30
const initialLng = 120

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
			latitude: initialLat,
			longitude: initialLng,
		},
		scale: 17,
		markers: [] as Marker[],
	},

	onLoad() {
		//之前测试socket的遗留代码
		// let msgReceived = 0
		// this.socket = CarService.subscribe(msg => {
		// 	msgReceived++
		// 	console.log(msg)
		// })

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
		//之前测试socket的遗留代码
		// this.socket?.close({
		// 	reason: "main",
		// })
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
					const carID = "636d2149af85de7d42a7a754"
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
		if (!this.socket) {
			this.setData({
				markers: []
			}, () => {
				this.setupCarPosUpdater()
			})
		}
	},
	onHide() {
		this.isPageShowing = false;
		if (this.socket) {
			this.socket.close({
				success: () => {
					this.socket = undefined
				}
			})
		}
	},

	onMyTripsTap() {
		wx.navigateTo({
			url: routing.mytrips()
		})
	},

	setupCarPosUpdater() {
		const map = wx.createMapContext("map")
		const markersByCarID = new Map<string, Marker>()
		let translationInProgress = false
		const endTranslation = () => {
			translationInProgress = false
		}
		this.socket = CarService.subscribe(car => {
			if (!car.id || translationInProgress || !this.isPageShowing) {
				console.log("dropped")
				return
			}
			const marker = markersByCarID.get(car.id)
			if (!marker) {
				const newMarker: Marker = {
					id: this.data.markers.length,
					iconPath: car.car?.driver?.avatarUrl || defaultAvatar,
					latitude: car.car?.position?.latitude || initialLat,
					longitude: car.car?.position?.longitude || initialLng,
					height: 20,
					width: 20,
				}
				markersByCarID.set(car.id, newMarker)
				this.data.markers.push(newMarker)
				translationInProgress = true
				this.setData({
					markers: this.data.markers,
				}, endTranslation)
				return
			}
			const newLat = car.car?.position?.latitude || initialLat
			const newLng = car.car?.position?.longitude || initialLng
			const newAvatar = car.car?.driver?.avatarUrl || defaultAvatar
			if (marker.iconPath !== newAvatar) {
				marker.iconPath = newAvatar
				marker.latitude = newLat
				marker.longitude = newLng
				translationInProgress = true
				this.setData({
					markers: this.data.markers,
				}, endTranslation)
				return
			}

			if (marker.latitude !== newLat || marker.longitude !== newLng) {
				translationInProgress = true
				map.translateMarker({
					destination: {
						latitude: newLat,
						longitude: newLng,
					},
					markerId: marker.id,
					autoRotate: false,
					rotate: 0,
					duration: 900,
					animationEnd: endTranslation,
				})
			}
		})
	},

	//模拟汽车移动，后面不需要
	// moveCars() {
	// 	const map = wx.createMapContext("map")
	// 	// const dest = {
	// 	// 	latitude: 23.099994,
	// 	// 	longitude: 113.324520
	// 	// }

	// 	const moveCar = () => {
	// 		this.location.latitude += 0.1
	// 		this.location.longitude += 0.1
	// 		map.translateMarker({
	// 			destination: {
	// 				latitude: this.location.latitude,
	// 				longitude: this.location.longitude,
	// 			},
	// 			markerId: 0,
	// 			autoRotate: false,
	// 			rotate: 0,
	// 			duration: 5000,
	// 			animationEnd: () => {
	// 				if (this.isPageShowing) {
	// 					moveCar()
	// 				}
	// 			},
	// 		})
	// 	}
	// 	moveCar()
	// }
})