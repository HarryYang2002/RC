import { IAppOption } from "../../appoption";
import { ProfileService } from "../../service/profile";
import { rental } from "../../service/proto_gen/rental/rental_pb";
import { tripService } from "../../service/trip";
import { formatDuration, formatFee } from "../../utils/format";
import { routing } from "../../utils/routing";

interface Trip {
	id: string
	shortId: string
	start: string
	end: string
	duration: string
	fee: string
	distance: string
	status: string
	inProgress: boolean
}

interface MainItem {
	id: string
	navId: string
	navScrollId: string
	data: Trip
}

interface NavItem {
	id: string
	mainId: string
	label: string
}

interface MainItemQueryResult {
	id: string
	top: number
	dataset: {
		navId: string
		navScrollId: string
	}
}

const tripStatusMap = new Map([
	[rental.v1.TripStatus.IN_PROGRESS, "进行中"],
	[rental.v1.TripStatus.FINISHED, "已完成"],
	// [rental.v1.TripStatus.IS_NOT_SPECIFIED,""]
])

const licStatusMap = new Map([
	[rental.v1.IdentityStatus.UNSUBMITTED, "未认证"],
	[rental.v1.IdentityStatus.PENDING, "为认证"],
	[rental.v1.IdentityStatus.VERIFIED, "已认证"]
])

// pages/mytrips/mytrips.ts
Page({
	scrollStates: {
		mainItems: [] as MainItemQueryResult[],
	},

	layoutResolver: undefined as ((value: unknown) => void) | undefined,

	//layoutResolver: value as (value: unknown) => void,

	data: {
		indicatorDots: true,
		autoPlay: false,
		interval: 3000,
		duration: 500,
		circular: true,
		multiItemCount: 1,
		prevMargin: "",
		nextMargin: "",
		vertical: false,
		current: 0,
		promotionItems: [
			{
				img: 'https://images3.alphacoders.com/102/thumbbig-102135.jpg',
				promotionID: 1,
			},
			{
				img: 'https://images2.alphacoders.com/102/thumbbig-102970.jpg',
				promotionID: 2,
			},
			{
				img: 'https://images8.alphacoders.com/418/thumbbig-418515.jpg',
				promotionID: 3,
			},
			{
				img: 'https://images8.alphacoders.com/441/thumbbig-441818.jpg',
				promotionID: 4,
			},
		],
		userInfo: {},
		hasUserInfo: false,
		canIUseGetUserProfile: false,
		shareLocation: true,
		avatarURL: '',
		tripsHeight: 0,
		navCount: 0,
		mainItems: [] as MainItem[],
		mainScroll: '',
		navItems: [] as NavItem[],
		navSel: '',
		navScroll: '',
		licStatus: licStatusMap.get(rental.v1.IdentityStatus.UNSUBMITTED),
	},
	onSwiperChange(e: any) {
		console.log(e);
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

	onRegisterTap() {
		wx.navigateTo({
			url: routing.register()
		})
	},

	async onLoad() {
		const layoutReady = new Promise((resolve) => {
			this.layoutResolver = resolve
		})
		// const [trips] = await Promise.all([tripService.getTrips(),layoutReady])
		// this.populateTrips(trips.trips!)
		//获取所有的trip
		Promise.all([tripService.getTrips(), layoutReady]).then(([trips]) => {
			this.populateTrips(trips.trips!)
		})
		//获取指定状态下的trip
		//const res = await tripService.getTrips(rental.v1.TripStatus.FINISHED)
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
	},

	onShow() {
		ProfileService.getProfile().then(p => {
			this.setData({
				licStatus: licStatusMap.get(p.identityStatus || 0)
			})
		})
	},

	onReady() {
		wx.createSelectorQuery().select("#heading").boundingClientRect(rect => {
			const height = wx.getSystemInfoSync().windowHeight - rect.height
			this.setData({
				tripsHeight: height,
				navCount: Math.round(height / 50),
			}, () => {
				if (this.layoutResolver) {
					this.layoutResolver(null)
				}
			})
		}).exec()
	},

	populateTrips(trips: rental.v1.ITripEntity[]) {
		const mainItems: MainItem[] = []
		const navItems: NavItem[] = []
		let navSel = ''
		let prevNav = ''
		for (let i = 0; i < trips.length; i++) {
			const trip = trips[i]
			const mainId = 'main-' + i
			const navId = 'nav-' + i
			const shortId = trip.id?.substring(trip.id.length - 6)
			if (!prevNav) {
				prevNav = navId
			}
			// distance: '27.0公里',
			// duration: '0时44分',
			// fee: '128.00元',
			// status: '已完成',
			const tripData: Trip = {
				id: trip.id!,
				shortId: "****" + shortId,
				start: trip.trip?.start?.poiName || "未知",
				end: '',
				distance: '',
				duration: '',
				fee: '',
				status: tripStatusMap.get(trip.trip?.status!) || "未知",
				inProgress: trip.trip?.status === rental.v1.TripStatus.IN_PROGRESS,
			}
			const end = trip.trip?.end

			//放在if中会报<应为表达式。ts(1109)>的错
			const dur = formatDuration((end?.timestampSec || 0) - (trip.trip?.start?.timestampSec || 0))
			if (end) {
				tripData.end = end.poiName || "未知",
					tripData.distance = end.kmDriven?.toFixed(1) + "公里",
					tripData.fee = formatFee(end.feeCent || 0),
					tripData.duration = `${dur.hh}时${dur.mm}分`
			}
			mainItems.push({
				id: mainId,
				navId: navId,
				navScrollId: prevNav,
				data: tripData,
			})
			navItems.push({
				id: navId,
				mainId: mainId,
				label: shortId || "",
			})
			if (i === 0) {
				navSel = navId
			}
			prevNav = navId
		}
		console.log("nav count:", this.data.navCount)
		for (let i = 0; i < this.data.navCount - 1; i++) {
			navItems.push({
				id: "",
				mainId: "",
				label: "",
			})
		}
		this.setData({
			mainItems,
			navItems,
			navSel,
		}, () => {
			this.prepareScrollStates()
		})
	},

	prepareScrollStates() {
		wx.createSelectorQuery().selectAll('.main-item')
			.fields({
				id: true,
				dataset: true,
				rect: true,
			}).exec(res => {
				this.scrollStates.mainItems = res[0]
			})
	},

	onPromotionItemTap(e: any) {
		const promotionID: number = e.currentTarget.dataset.promotionId
		if (promotionID) {
			console.log('claiming promotion', promotionID)
		}
	},

	onGetUserInfo(e: any) {
		const userInfo: WechatMiniprogram.UserInfo = e.detail.userInfo
		if (userInfo) {
			getApp<IAppOption>().resolveUserInfo(userInfo)
			this.setData({
				avatarURL: userInfo.avatarUrl,
			})
		}
	},


	// onNavItemTap(e: any) {
	// 	const mainId: string = e.currentTarget?.dataset?.mainId
	// 	if (mainId) {
	// 		this.setData({
	// 			mainScroll: mainId,
	// 		})
	// 	}
	// },

	onNavItemTap(e: any) {
		const mainId: string = e.currentTarget?.dataset?.mainId
		const navId: string = e.currentTarget?.id
		if (mainId && navId) {
			this.setData({
				mainScroll: mainId,
				navSel: navId,
			})
		}
	},

	onMainScroll(e: any) {
		const top: number = e.currentTarget?.offsetTop + e.detail?.scrollTop
		if (top === undefined) {
			return
		}

		const selItem = this.scrollStates.mainItems.find(
			v => v.top >= top)
		if (!selItem) {
			return
		}

		this.setData({
			navSel: selItem.dataset.navId,
			navScroll: selItem.dataset.navScrollId,
		})
	},

	onMianItemTap(e: any) {
		if (!e.currentTarget.dataset.tripInProgress) {
			return
		}
		const tripId = e.currentTarget.dataset.tripId
		if (tripId) {
			wx.navigateTo({
				url: routing.driving({
					trip_id: tripId,
				}),
			})
		}
	}
})