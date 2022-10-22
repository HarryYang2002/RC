import { ProfileService } from "../../service/profile"
import { rental } from "../../service/proto_gen/rental/rental_pb"
import { padString } from "../../utils/format"
import { routing } from "../../utils/routing"

function formatDate(millis: number) {
	const dt = new Date(millis)
	const y = dt.getFullYear()
	const m = dt.getMonth() + 1
	const d = dt.getDate()
	return `${padString(y)}-${padString(m)}-${padString(d)}`
}

Page({
	redirectURL: '',
	profileRefresher: 0,
	data: {
		licNo: '',
		name: '',
		genderIndex: 0,
		genders: ['未知', '男', '女'],
		birthDate: '1990-01-01',
		licImgURL: '',
		state: rental.v1.IdentityStatus[rental.v1.IdentityStatus.UNSUBMITTED],
	},
	onUnloadLic() {
		wx.chooseMedia({
			success: res => {
				if (res.tempFiles.length > 0) {
					this.setData({
						licImgURL: res.tempFiles[0].tempFilePath
					})
					const data = wx.getFileSystemManager().readFileSync(res.tempFiles[0].tempFilePath)
					wx.request({
						method: "PUT",
						url: "https://szturc-1306570831.cos.ap-guangzhou.myqcloud.com/aaa.jpg?q-sign-algorithm=sha1&q-ak=AKIDgBg2WyMkQxHSJi3FOfpqqkn95675ukpz&q-sign-time=1666454150%3B1666457750&q-key-time=1666454150%3B1666457750&q-header-list=host&q-url-param-list=&q-signature=a925bcca67a7cc714194b9b444eb01ca29f1e139",
						data,
						success: console.log,
						fail: console.error,
					})
				}
			}
		})
	},

	renderProfile(p: rental.v1.IProfile) {
		this.setData({
			licNo: p.identity?.licNumber || "",
			name: p.identity?.name || "",
			genderIndex: p.identity?.gender || 0,
			birthDate: formatDate(p.identity?.birthDateMillis || 0),
			state: rental.v1.IdentityStatus[p.identityStatus || 0],
		})
	},

	onLoad(opt: Record<"redirect", string>) {
		const o: routing.RegisterOpts = opt
		if (o.redirect) {
			this.redirectURL = decodeURIComponent(o.redirect)
		}
		ProfileService.getProfile().then(p => this.renderProfile(p))
	},

	onGenderChange(e: any) {
		this.setData({
			genderIndex: parseInt(e.detail.value),
		})
	},

	onBirthDateChange(e: any) {
		this.setData({
			birthDate: e.detail.value,
		})
	},

	onSubmit() {
		ProfileService.submitProfile({
			licNumber: this.data.licNo,
			name: this.data.name,
			gender: this.data.genderIndex,
			birthDateMillis: Date.parse(this.data.birthDate),
		}).then(p => {
			this.renderProfile(p)
			this.scheduleProfileRefresher()
		})
	},

	onUnload() {
		this.clearProfileRefresher()
	},

	scheduleProfileRefresher() {
		this.profileRefresher = setInterval(() => {
			ProfileService.getProfile().then(p => {
				this.renderProfile(p)
				if (p.identityStatus !== rental.v1.IdentityStatus.PENDING) {
					this.clearProfileRefresher()
				}
				if (p.identityStatus === rental.v1.IdentityStatus.VERIFIED) {
					this.onLicVerified()
				}
			})
		}, 1000)
	},

	clearProfileRefresher() {
		if (this.profileRefresher) {
			clearInterval(this.profileRefresher)
			this.profileRefresher = 0
		}
	},

	onResubmit() {
		ProfileService.clearProfile().then(p => this.renderProfile(p))
	},

	onLicVerified() {
		if (this.redirectURL) {
			wx.redirectTo({
				url: this.redirectURL,
			})
		}
	}
})