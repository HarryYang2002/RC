import { routing } from "../../utils/routing"

Page({
	redirectURL: '',
	data: {
		licImgURL: '',
		genders: ['未知', '男', '女', '其他'],
		genderIndex: 0,
		birthDate: '1970-01-01',
		licNo: '',
		name: '',
		state: 'UNSUBMITTED' as 'UNSUBMITTED' | 'PENDING' | 'VERIFIED',
	},
	onUnloadLic() {
		wx.chooseMedia({
			success: res => {
				if (res.tempFiles.length > 0) {
					this.setData({
						licImgURL: res.tempFiles[0].tempFilePath
					})
					setTimeout(() => {
						this.setData({
							licNo: '13523463',
							name: 'Harry',
							genderIndex: 1,
							birthDate: '2002-06-06'
						})
					}, 1000)
				}
			}
		})
	},

	onLoad(opt: Record<"redirect",string>) {
		const o : routing.RegisterOpts = opt
		if (o.redirect) {
			this.redirectURL = decodeURIComponent(o.redirect)
		}
	},

	onGenderChange(e: any) {
		this.setData({
			genderIndex: e.detail.value,
		})
	},
	onBirthDateChange(e: any) {
		this.setData({
			birthDate: e.detail.value,
		})
	},
	onSubmit() {
		this.setData({
			state: 'PENDING',
		})
		setTimeout(() => {
			this.onLicVerified()
		}, 3000)
	},
	onResubmit() {
		this.setData({
			state: 'UNSUBMITTED',
			licImgURL: '',
		})
	},
	onLicVerified() {
		this.setData({
			state: 'VERIFIED',
		})
		if (this.redirectURL) {
			wx.redirectTo({
				url: this.redirectURL,
			})
		}

	}
})